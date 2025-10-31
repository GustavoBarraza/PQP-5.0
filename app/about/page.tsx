export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Imagen de fondo */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: "url('/background-quienes-quienes-somos.webp')" }}
            />
            
            {/* Contenido */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Texto */}
                    <div className="flex-1">
                        <h1 className="text-7xl font-bold text-gray-900 mb-6">
                            Innovamos la forma de conectar la calidad, la productividad y las personas
                        </h1>
                        <p className="text-lg text-gray-700 mb-4">
                            Nuestra plataforma PQP 5.0 impulsa la excelencia operativa a través de colaboración inteligente,
                            optimizando, garantizando seguridad y potenciando el talento humano en entornos industriales avanzados.
                        </p>
                    </div>
                    
                    {/* Imagen al lado del texto */}
                    <div className="flex-5">
                        <img 
                            src="/background-PQP-2.webp" 
                            alt="PQP 5.0" 
                            className="w-full h-auto rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}