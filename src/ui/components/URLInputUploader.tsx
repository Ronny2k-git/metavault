import { useRef, useState } from 'react'
import { Button } from './Button'
import { Input, InputProps } from './Input'

type event = React.ChangeEvent<HTMLInputElement>

export function URLInputUploader({ label, inputSize, placeholder }: InputProps) {
  const [fileName, setFileName] = useState('')
  const uploadRef = useRef<HTMLInputElement>(null)

  const onClickUpload = () => {
    uploadRef.current?.click()
  }

  const onFileChange = (e: event) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="">
      <input type="file" hidden ref={uploadRef} accept={'image/*'} onChange={onFileChange} />

      <Input
        inputSize={inputSize}
        label={fileName || label}
        placeholder={placeholder}
        disabled={!!fileName}
        iconRight={
          <Button className="w-30 h-6 rounded-full text-sm" onClick={onClickUpload}>
            Upload Image
          </Button>
        }
      />
    </div>
  )
}
