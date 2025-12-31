import requests
from bs4 import BeautifulSoup
import os
import urllib.parse
import json
import time
import re

BASE_URL = "https://atelierkusa.sk"
PROJECTS_URL = "https://atelierkusa.sk/projekty/"
OUTPUT_DIR = "public/projects"

def safe_filename(name):
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', name)

def download_image(url, folder):
    try:
        filename = os.path.basename(urllib.parse.urlparse(url).path)
        if not filename:
            filename = "image.jpg"
        
        filepath = os.path.join(folder, filename)
        if os.path.exists(filepath):
            return filename # already downloaded
            
        r = requests.get(url, stream=True, headers={'User-Agent': 'Mozilla/5.0'})
        if r.status_code == 200:
            with open(filepath, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            return filename
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return None

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0'})
    
    print(f"Fetching projects list from {PROJECTS_URL}...")
    resp = session.get(PROJECTS_URL)
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    # Find project links
    # Based on probe, they have class 'brxe-container'
    project_links = []
    seen_urls = set()
    
    for a in soup.find_all('a', class_='brxe-container'):
        href = a.get('href')
        if not href: continue
        full_url = urllib.parse.urljoin(BASE_URL, href)
        
        # Filter out homepage or unwanted links if any
        if full_url == BASE_URL or full_url == PROJECTS_URL:
            continue
            
        if full_url not in seen_urls:
            seen_urls.add(full_url)
            title = a.text.strip()
            if not title:
                # Try to get title from child elements
                title = full_url.strip('/').split('/')[-1]
            project_links.append({'url': full_url, 'title': title})

    print(f"Found {len(project_links)} projects.")
    
    projects_data = []

    for i, proj in enumerate(project_links):
        print(f"Processing [{i+1}/{len(project_links)}]: {proj['title']} ({proj['url']})")
        
        try:
            p_resp = session.get(proj['url'])
            p_soup = BeautifulSoup(p_resp.text, 'html.parser')
            
            # Extract real title from H1 if possible
            h1 = p_soup.find('h1')
            real_title = h1.text.strip() if h1 else proj['title']
            slug = safe_filename(real_title)
            
            proj_dir = os.path.join(OUTPUT_DIR, slug)
            if not os.path.exists(proj_dir):
                os.makedirs(proj_dir)
                
            # Find images
            # Look for images in the content area. 
            # Bricks builder often uses 'brxe-image' class or just img tags in containers.
            images = []
            img_tags = p_soup.find_all('img')
            
            # Filter distinct high-quality images
            seen_imgs = set()
            
            for img in img_tags:
                src = img.get('src')
                # Prefer data-src or full size if available
                if img.get('data-src'):
                    src = img.get('data-src')
                
                if not src: continue
                
                # Filter out small icons/logos if possible (heuristic)
                if 'logo' in src.lower() or 'icon' in src.lower():
                    continue
                    
                full_img_url = urllib.parse.urljoin(proj['url'], src)
                
                if full_img_url not in seen_imgs:
                    seen_imgs.add(full_img_url)
                    filename = download_image(full_img_url, proj_dir)
                    if filename:
                        images.append(f"/projects/{slug}/{filename}")
            
            projects_data.append({
                'title': real_title,
                'slug': slug,
                'images': images,
                'thumbnail': images[0] if images else None
            })
            
            # Be nice to the server
            time.sleep(0.5)
            
        except Exception as e:
            print(f"Error processing {proj['url']}: {e}")

    # Save metadata
    with open('public/projects.json', 'w') as f:
        json.dump(projects_data, f, indent=2)
        
    print("Scraping complete. Metadata saved to public/projects.json")

if __name__ == "__main__":
    main()
