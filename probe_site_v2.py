import requests
from bs4 import BeautifulSoup
import urllib.parse
import sys

BASE_URL = "https://atelierkusa.sk"

def probe():
    session = requests.Session()
    session.headers.update({'User-Agent': 'Mozilla/5.0'})
    
    print(f"Fetching {BASE_URL}...")
    try:
        resp = session.get(BASE_URL)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Look for 'Projekty' link
        projekty_link = None
        for a in soup.find_all('a'):
            if a.text and 'projekty' in a.text.lower():
                projekty_link = a.get('href')
                print(f"Found Projekty link: {projekty_link}")
                break
        
        if not projekty_link:
            print("Could not find 'Projekty' link on homepage. Dumping all links:")
            for a in soup.find_all('a'):
                print(f" - {a.text.strip()}: {a.get('href')}")
            return

        projekty_url = urllib.parse.urljoin(BASE_URL, projekty_link)
        print(f"Fetching Projekty page: {projekty_url}")
        
        resp = session.get(projekty_url)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # Try to find project links. Usually they are in a grid.
        # I'll look for links that are NOT the nav links.
        print("\nSearching for project links in Projekty page...")
        print("Dumping all links on Projekty page to analyze structure:")
        
        count = 0
        for a in soup.find_all('a'):
            href = a.get('href')
            text = a.text.strip()
            classes = a.get('class', [])
            parent_classes = a.parent.get('class', []) if a.parent else []
            
            if href:
                count += 1
                if count > 50: break # limit output
                print(f"Link: {text[:20]}... | Href: {href} | Class: {classes} | Parent Class: {parent_classes}")
                     
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    probe()
