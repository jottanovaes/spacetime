"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState< string | null>(null);
  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const {files} = event.target

    if (!files) return 
    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
      type="file"
      name="coverUrl"
      id="media"
      className="invisible h-0 w-0"
      accept="image/*"
      onChange={onMediaSelected}
    />
    {
      preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover"/>
    }
    </>
  );
}
