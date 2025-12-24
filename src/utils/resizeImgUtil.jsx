export const resizeImageAuto = (
    file,
    maxSize = 500,
    quality = 0.75,
    format = "image/jpeg"
) => {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            let { width, height } = img;

            // Detectar orientación
            if (width >= height) {
                // Horizontal
                if (width > maxSize) {
                    const ratio = maxSize / width;
                    width = maxSize;
                    height = height * ratio;
                }
            } else {
                // Vertical
                if (height > maxSize) {
                    const ratio = maxSize / height;
                    height = maxSize;
                    width = width * ratio;
                }
            }

            const canvas = document.createElement("canvas");
            canvas.width = Math.round(width);
            canvas.height = Math.round(height);

            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    resolve(
                        new File([blob], file.name, {
                            type: format,
                            lastModified: Date.now(),
                        })
                    );
                },
                format,
                quality
            );
        };

        reader.readAsDataURL(file);
    });
};
