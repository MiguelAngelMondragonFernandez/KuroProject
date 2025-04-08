import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function FileUploader({ File, defaultImage, className = "" }) {
    const [fileName, setFileName] = useState("");
    const [preview, setPreview] = useState(defaultImage || null);

    useEffect(() => {
        if (defaultImage) {
            setPreview(defaultImage);
        }
    }, [defaultImage]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            File(file);
        }
    };

    return (
        <div className={`flex flex-column align-items-center gap-2 ${className}`}>
            <p className="text-white text-sm font-medium">{fileName || "Foto de perfil:"}</p>
            <label className="cursor-pointer">
                <img 
                    src={preview || defaultImage} 
                    alt="Vista previa" 
                    className="w-6rem h-6rem border-circle object-cover border border-gray-700 hover:opacity-75 transition-all"
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
