import csv
import datetime
import os

def convert_dropbox_link(link: str) -> str:
    """
    Converts a Dropbox share link to a direct download link.
    If the link contains 'www.dropbox.com', it replaces it with 'dl.dropboxusercontent.com'
    and removes '?dl=0' from the URL if present.
    """
    if "www.dropbox.com" in link:
        direct_link = link.replace("www.dropbox.com", "dl.dropboxusercontent.com")
        if "?dl=0" in direct_link:
            direct_link = direct_link.replace("?dl=0", "")
        # Alternatively, force raw view by replacing with '?raw=1'
        # direct_link = link.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "?raw=1")
        return direct_link
    return link

def main():
    # Determine the directory where the script is located.
    script_dir = os.path.dirname(os.path.realpath(__file__))

    # Define input and output CSV file paths.
    input_csv_path = os.path.join(script_dir, 'products.csv')
    output_csv_path = os.path.join(script_dir, 'converted_products.csv')

    # Starting ID for the first record.
    start_id = 5

    # Define the fieldnames as per your Products table.
    fieldnames = [
        'id',
        'affiliate_link',
        'created_at',
        'image_url',
        'price',
        'product_description',
        'product_description_thai',
        'product_name',
        'product_name_thai',
        'updated_at',
        'platform',
        'category',
        'subcategory',
        'brand',
        'store_link',
        'highlighted',
        'pre_list'
    ]

    # Open the input CSV for reading and the output CSV for writing.
    with open(input_csv_path, 'r', newline='', encoding='utf-8') as infile, \
         open(output_csv_path, 'w', newline='', encoding='utf-8') as outfile:
        
        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        
        # Write header to the new CSV.
        writer.writeheader()
        
        current_id = start_id
        for row in reader:
            # Convert the image_url field if it's a Dropbox link.
            raw_image_url = row.get('image_url', '')
            converted_image_url = convert_dropbox_link(raw_image_url)
            
            # Prepare a new row dictionary with default values where necessary.
            new_row = {
                'id': current_id,
                'affiliate_link': row.get('affiliate_link', ''),
                'created_at': row.get('created_at', datetime.datetime.now().isoformat()),
                'image_url': converted_image_url,
                'price': row.get('price', 0.0),
                'product_description': row.get('product_description', ''),
                'product_description_thai': row.get('product_description_thai', ''),
                'product_name': row.get('product_name', ''),
                'product_name_thai': row.get('product_name_thai', ''),
                'updated_at': row.get('updated_at', datetime.datetime.now().isoformat()),
                'platform': row.get('platform', ''),
                'category': row.get('category', ''),
                'subcategory': row.get('subcategory', ''),
                'brand': row.get('brand', ''),
                'store_link': row.get('store_link', ''),
                'highlighted': row.get('highlighted', 'False'),
                'pre_list': row.get('pre_list', '')
            }
            writer.writerow(new_row)
            current_id += 1

    print(f"Converted CSV file has been written to: {output_csv_path}")

if __name__ == '__main__':
    main()