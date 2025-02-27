import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
  // remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");
  return asciiString;
}

  export const leftSideImages = [
    "https://cdn.prod.website-files.com/652e8c998f656fbf00cb7c99/6678b7b7dd184c47b6ab42ba_W5MgPwnoAX-photo.png",
    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_441d7f43ead31df601a2dc864f5d8ec564d2e7ae.jpg",
    "https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg",
    "https://marketplace.canva.com/EAFzfwx_Qik/4/0/1131w/canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg",
    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_8aac65e6f36ea126a8b14b270248dcd3033ec77c.jpg",
    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_cd8cc5756a40cd9e305977e4488548aa2aa1e54b.jpg",
    "https://marketplace.canva.com/EAFhHrjw0Qk/1/0/1131w/canva-black-and-white-simple-classic-professional-cover-letter-G55SxrJRkKo.jpg",
  ];

  export   const rightSideImages = [
    "https://marketplace.canva.com/EAFhHrjw0Qk/1/0/1131w/canva-black-and-white-simple-classic-professional-cover-letter-G55SxrJRkKo.jpg",
    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_441d7f43ead31df601a2dc864f5d8ec564d2e7ae.jpg",
    "https://marketplace.canva.com/EAFzfwx_Qik/4/0/1131w/canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg",
    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_8aac65e6f36ea126a8b14b270248dcd3033ec77c.jpg",
    "https://cdn.prod.website-files.com/652e8c998f656fbf00cb7c99/6678b7b7dd184c47b6ab42ba_W5MgPwnoAX-photo.png",
    "https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_cd8cc5756a40cd9e305977e4488548aa2aa1e54b.jpg",
    "https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg",
    ];