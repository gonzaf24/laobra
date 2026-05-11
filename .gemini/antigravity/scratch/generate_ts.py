import json

def generate_ts():
    with open(".gemini/antigravity/scratch/extracted_catalog.json", "r", encoding="utf-8") as f:
        products = json.load(f)
    
    # Group by (category, subcategory) and pick top 15
    grouped = {}
    for p in products:
        key = (p["categoriaId"], p["subcategoria"])
        if key not in grouped:
            grouped[key] = []
        if len(grouped[key]) < 25: # Take up to 25 per category/subcategory
            grouped[key].append(p)
    
    # Flatten and generate TS
    final_products = []
    for sub in grouped:
        final_products.extend(grouped[sub])
    
    print("export const OBRAMAT_CATALOGO: ObramatProducto[] = [")
    for i, p in enumerate(final_products):
        comma = "," if i < len(final_products) - 1 else ""
        print(f'  {{ sku: "{p["sku"]}", nombre: "{p["nombre"]}", formato: "{p["formato"]}", precioUnitario: {p["precioUnitario"]}, categoriaId: "{p["categoriaId"]}", subcategoria: "{p["subcategoria"]}", paginaCatalogo: {p["paginaCatalogo"]}{", esEstandar: true" if p["esEstandar"] else ""} }}{comma}')
    print("];")

if __name__ == "__main__":
    generate_ts()
