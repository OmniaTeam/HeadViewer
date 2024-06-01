import React, { useRef, useState } from 'react';
import { Button } from "@nextui-org/react";

interface FileUploaderProps {
    onFileSelect: (files: FileList) => void;
}

export const FileUploader = (props: FileUploaderProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFilesCount, setSelectedFilesCount] = useState(0);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setSelectedFilesCount(selectedFiles.length);
            props.onFileSelect(selectedFiles);
        }
    };

    return (
        <div className='flex items-center gap-3'>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                onChange={handleFileSelect}
            />
            <Button variant='solid' color="primary" size="md" radius="sm" onClick={() => fileInputRef.current?.click()}>{selectedFilesCount !== 0 ? `Выбрано файлов: ${selectedFilesCount}` : "Выбрать файлы"}</Button>
        </div>
    );
};