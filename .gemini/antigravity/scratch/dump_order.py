import re

def dump_csv_order(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    
    order = []
    for i, line in enumerate(lines):
        line_clean = line.strip().replace(';', ' ')
        sku_match = re.search(r'(\d{8})', line)
        
        # Detectar títulos (Mayúsculas, no empiezan por número)
        upper_match = re.search(r'"?([A-Z\s\-]{5,})"?', line)
        
        if sku_match:
            order.append(("SKU", sku_match.group(1), i+1))
        if upper_match:
            title = upper_match.group(1).strip()
            if len(title) > 5 and not re.match(r'^\d', title) and "UNIDAD" not in title:
                order.append(("TITLE", title, i+1))
    
    return order

order = dump_csv_order("public/csv/1.csv")
for item in order[:100]:
    print(item)
