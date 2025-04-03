import { useState } from "react";
import { Upload } from "lucide-react";

export default function FileUploader({File}) {
    const [fileName, setFileName] = useState("");
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            File(file); // Enviar la URL al estado padre
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-white text-sm font-medium flex justify-content-center ">Foto de perfil:</p>

            {preview ? (
                <label className="cursor-pointer">
                    <img 
                        src={preview} 
                        alt="Vista previa" 
                        className="w-10rem h-10rem border-circle object-cover rounded-full border border-gray-700 hover:opacity-75 transition-all"
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            ) : (
                <label className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all">
                    <Upload className="w-8 h-8" />
                    <span>{fileName || "Seleccionar archivo"}</span>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            )}
        </div>
    );
}
