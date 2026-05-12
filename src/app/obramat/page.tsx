"use client";

import { useObramat } from "./hooks/useObramat";
import { Header } from "./_components/Header";
import { Sidebar } from "./_components/Sidebar";
import { PdfViewer } from "./_components/PdfViewer";
import { ProductList } from "./_components/ProductList";
import { Toast } from "./_components/Toast";
import { SubcategoryModal } from "./_components/Modals/SubcategoryModal";
import { ProductModal } from "./_components/Modals/ProductModal";

export default function ObramatPage() {
  const {
    activeCategory, setActiveCategory,
    activeSubcategory, setActiveSubcategory,
    viewMode, setViewMode,
    isMobileMenuOpen, setIsMobileMenuOpen,
    copiedSku,
    isModalSubOpen, setIsModalSubOpen,
    isModalProductOpen, setIsModalProductOpen,
    activeCatObj,
    subcategories,
    filteredProducts,
    currentPdf,
    handlePdfClick,
    addSubcategory,
    addMaterial,
  } = useObramat();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950">
      <Toast show={!!copiedSku} />
      
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        isMenuOpen={isMobileMenuOpen} 
      />

      <div className="relative flex flex-1 overflow-hidden pt-14">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          viewMode={viewMode}
          onSelectCategory={setActiveCategory}
          onSelectSubcategory={setActiveSubcategory}
          onSelectViewMode={setViewMode}
          getSubcategories={(catId) => subcategories}
        />

        {/* Overlay Móvil */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[240] bg-slate-950/80 backdrop-blur-sm lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}

        <main className="flex-1 relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 flex flex-col">
            {viewMode === "pdf" ? (
              <PdfViewer
                currentPdf={currentPdf}
                categoryName={activeCatObj?.nombre}
                showActions={!!activeCategory}
                onAddSubcategory={() => setIsModalSubOpen(true)}
                onAddProduct={() => setIsModalProductOpen(true)}
              />
            ) : (
              <ProductList
                categoryName={activeCatObj?.nombre}
                subcategoryName={activeSubcategory || "Materiales"}
                products={filteredProducts}
                onAddProduct={() => setIsModalProductOpen(true)}
                onViewPdf={(sku) => {
                  handlePdfClick(sku);
                  setViewMode("pdf");
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modales */}
      <SubcategoryModal
        isOpen={isModalSubOpen}
        onClose={() => setIsModalSubOpen(false)}
        onSubmit={addSubcategory}
        categoryName={activeCatObj?.nombre}
      />

      {activeCategory && (
        <ProductModal
          isOpen={isModalProductOpen}
          onClose={() => setIsModalProductOpen(false)}
          onSubmit={addMaterial}
          subcategories={subcategories}
          activeSubcategory={activeSubcategory}
          activeCategory={activeCategory}
        />
      )}
    </div>
  );
}
