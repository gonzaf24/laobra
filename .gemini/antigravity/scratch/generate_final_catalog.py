import json

# Curated catalog for "La Obra" using Obramat real SKUs found in CSVs
CATALOGO_LA_OBRA = [
    # MATERIALES DE CONSTRUCCIÓN
    {"sku": "10355464", "nombre": "MORTERO SECO M-7.5 (25kg)", "categoriaId": "materiales", "precio": 2.15, "tipo": "estandar"},
    {"sku": "10355436", "nombre": "CEMENTO GRIS (35kg)", "categoriaId": "materiales", "precio": 4.50, "tipo": "frecuente"},
    {"sku": "10355450", "nombre": "ARENA DE RÍO (Saco)", "categoriaId": "materiales", "precio": 1.25, "tipo": "frecuente"},
    {"sku": "10355415", "nombre": "LADRILLO HUECO DOBLE (Totxana)", "categoriaId": "materiales", "precio": 0.22, "tipo": "estandar"},
    
    # COCINAS
    {"sku": "25102434", "nombre": "ENCIMERA FENÓLICO MARQUINA 150x64", "categoriaId": "cocinas", "precio": 115.00, "tipo": "estandar"},
    {"sku": "10925235", "nombre": "FREGADERO ACERO 1 CUBETA", "categoriaId": "cocinas", "precio": 45.00, "tipo": "frecuente"},
    {"sku": "10565886", "nombre": "GRIFO COCINA CAÑO ALTO", "categoriaId": "cocinas", "precio": 29.95, "tipo": "frecuente"},
    
    # CERÁMICA
    {"sku": "10592050", "nombre": "PORCELÁNICO GRIS 60x60", "categoriaId": "ceramica", "precio": 15.95, "tipo": "estandar"},
    {"sku": "10784123", "nombre": "AZULEJO BLANCO MATE 30x60", "categoriaId": "ceramica", "precio": 12.50, "tipo": "frecuente"},
    {"sku": "10253852", "nombre": "RODAPIÉ GRIS 60x60", "categoriaId": "ceramica", "precio": 5.58, "tipo": "frecuente"},
    
    # BAÑOS
    {"sku": "25101359", "nombre": "PACK WC PORCELANA BLANCA", "categoriaId": "banos", "precio": 89.00, "tipo": "estandar"},
    {"sku": "25046406", "nombre": "PLATO DUCHA RESINA BLANCO", "categoriaId": "banos", "precio": 125.00, "tipo": "frecuente"},
    {"sku": "10531766", "nombre": "GRIFO LAVABO MONOMANDO", "categoriaId": "banos", "precio": 24.95, "tipo": "frecuente"},
    
    # PINTURA
    {"sku": "10474184", "nombre": "PINTURA PLÁSTICA BLANCA 15L", "categoriaId": "pintura", "precio": 35.00, "tipo": "estandar"},
    {"sku": "10693354", "nombre": "IMPRIMACIÓN FIJADORA 5L", "categoriaId": "pintura", "precio": 14.95, "tipo": "frecuente"},
    {"sku": "25066492", "nombre": "RODILLO ANTIGOTA 22cm", "categoriaId": "pintura", "precio": 6.50, "tipo": "frecuente"},
    
    # ELECTRICIDAD
    {"sku": "10381686", "nombre": "CABLE 1.5mm2 AZUL (100m)", "categoriaId": "electricidad", "precio": 25.00, "tipo": "estandar"},
    {"sku": "10381693", "nombre": "CABLE 2.5mm2 MARRÓN (100m)", "categoriaId": "electricidad", "precio": 38.00, "tipo": "frecuente"},
    {"sku": "10701894", "nombre": "MECANISMO INTERRUPTOR BLANCO", "categoriaId": "electricidad", "precio": 4.50, "tipo": "frecuente"},
    
    # FONTANERÍA
    {"sku": "10922534", "nombre": "TUBO PVC Ø110 3m", "categoriaId": "fontaneria", "precio": 12.00, "tipo": "estandar"},
    {"sku": "25053041", "nombre": "LLAVE DE ESCUADRA 1/2-3/8", "categoriaId": "fontaneria", "precio": 3.50, "tipo": "frecuente"},
    {"sku": "25046415", "nombre": "SIFÓN BOTELLA EXTENSIBLE", "categoriaId": "fontaneria", "precio": 5.95, "tipo": "frecuente"},
    
    # MADERA
    {"sku": "10082786", "nombre": "SUELO LAMINADO AC4 ROBLE", "categoriaId": "madera", "precio": 11.95, "tipo": "estandar"},
    {"sku": "10082793", "nombre": "FRISO MADERA PINO", "categoriaId": "madera", "precio": 9.50, "tipo": "frecuente"},
    {"sku": "10680551", "nombre": "PUERTA BLANCA MACIZA", "categoriaId": "madera", "precio": 95.00, "tipo": "frecuente"},
    
    # HERRAMIENTAS
    {"sku": "10793174", "nombre": "TALADRO PERCUTOR 18V", "categoriaId": "herramientas", "precio": 89.00, "tipo": "estandar"},
    {"sku": "10726240", "nombre": "AMOLADORA 115mm", "categoriaId": "herramientas", "precio": 45.00, "tipo": "frecuente"},
    {"sku": "25081052", "nombre": "NIVEL TUBULAR 60cm", "categoriaId": "herramientas", "precio": 12.50, "tipo": "frecuente"},
    
    # FERRETERÍA
    {"sku": "10505621", "nombre": "CAJA TORNILLOS MADERA 4x40", "categoriaId": "ferreteria", "precio": 9.50, "tipo": "estandar"},
    {"sku": "10984365", "nombre": "CERRADURA SOBREPONER", "categoriaId": "ferreteria", "precio": 18.00, "tipo": "frecuente"},
    {"sku": "10788253", "nombre": "SILICONA BLANCA (Bote)", "categoriaId": "ferreteria", "precio": 3.95, "tipo": "frecuente"}
]

with open(".gemini/antigravity/scratch/catalog_laobra.json", "w", encoding="utf-8") as f:
    json.dump(CATALOGO_LA_OBRA, f, indent=2, ensure_ascii=False)
