import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import '../assets/css/fileinput.css'

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
        <div className="flex flex-column justify-content-center align-items-center gap-2">
            <p className="text-white text-sm font-medium flex justify-content-center ">Foto de perfil:</p>

            {preview ? (
                <label className="cursor-pointer">
                    <div className="relative border-circle overflow-hidden border-700 w-10rem h-10rem">
                        <div
                            style={{
                                backgroundImage: `url(${preview})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                            className="surface-overlay transition-all transition-duration-300"
                        />
                        <div className="overlay absolute top-0 left-0 w-full h-full flex align-items-center justify-content-center transition-all transition-duration-300">
                            <i className="pi pi-camera text-white text-2xl"></i>
                        </div>

                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            ) : (
                <label className="flex align-items-center justify-content-center w-10rem h-10rem gap-2 p-4 bg-gray-600 text-white border border-circle cursor-pointer hover:bg-gray-700 transition-all">
                    <Upload className="w-8 h-8" />
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
