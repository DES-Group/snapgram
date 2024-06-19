import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button } from '../ui/button';

type FileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [fileUrl, setFileUrl] = useState(mediaUrl || '');

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const newFileUrl = URL.createObjectURL(file);
            setFileUrl(newFileUrl);
            fieldChange([file]);
        }
    }, [fieldChange]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg']
        } ,
    });

    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {fileUrl ? (
                <>
                    <div className='flex justify-center w-full p-5'>
                        <img
                            src={fileUrl}
                            alt="Uploaded file"
                            className='file_uploader-img'
                        />
                    </div>
                    <p className='file_uploader_label'>
                        Cliquez ou faites glisser la photo pour la remplacer
                    </p>
                </>
            ) : (
                <div className='file_uploader-box'>
                    <img
                        src='/assets/icons/file-upload.svg'
                        width={96}
                        height={77}
                        alt="file-upload"
                    />
                    <h3 className='base-medium text-light-2 mb-2 mt-6'>Faites glisser les photos ici</h3>
                    <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
                    <Button className='shad-button_dark_4'>
                        Sélectionner
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
