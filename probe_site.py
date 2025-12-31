import requests
from bs4 import BeautifulSoup
import os
import urllib.parse

BASE_URL = "https://atelierkusa.sk"

def analyze_site():
    print(f"Fetching {BASE_URL}...")
    try:
        response = requests.get(BASE_URL, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        print("Page Title:", soup.title.string if soup.title else "No title")
        
        # Find all links
        links = soup.find_all('a')
        print(f"Found {len(links)} links.")
        
        project_links = []
        for link in links:
            href = link.get('href')
            if href and 'projekt' in href:
                full_url = urllib.parse.urljoin(BASE_URL, href)
                project_links.append(full_url)
                print(f"Potential Project Link: {full_url}")
                
        return project_links

    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    analyze_site()
