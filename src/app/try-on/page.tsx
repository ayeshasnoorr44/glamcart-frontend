'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { tryOnAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Spinner component
const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// Upload icon component
const UploadIcon = () => (
  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default function TryOnPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [modifiedImage, setModifiedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#D4486B');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 10MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setModifiedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!uploadedImage || !fileInputRef.current?.files?.[0]) {
      toast({
        variant: "destructive",
        title: "Missing selection",
        description: "Please upload a photo and select a lipstick color.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', fileInputRef.current.files[0]);
      formData.append('colorHex', selectedColor);
      formData.append('productId', 'sample-product-id'); // You can make this dynamic

      const response = await tryOnAPI.applyLipstick(formData);
      setModifiedImage(response.data.data.processedImage);

      toast({
        title: "Success!",
        description: "Lipstick applied successfully.",
      });
    } catch (error) {
      console.error('Try-on failed:', error);
      toast({
        variant: "destructive",
        title: "Try-on failed",
        description: "Make sure the backend is running on port 5000.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const lipstickColors = [
    { name: 'Rouge', hex: '#D4486B' },
    { name: 'Nude', hex: '#C4A69D' },
    { name: 'Pink', hex: '#E6A5C7' },
    { name: 'Red', hex: '#B22222' },
    { name: 'Berry', hex: '#8B1538' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Virtual Lipstick Try-On
        </h1>
        <p className="text-gray-600">
          Upload a photo and see how different lipstick colors look on you
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Selected"
                  className="max-w-full max-h-64 mx-auto rounded"
                />
              ) : (
                <div>
                  <UploadIcon />
                  <p className="text-gray-600">Click to upload a photo</p>
                  <p className="text-sm text-gray-400">JPG, PNG up to 10MB</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Choose Lipstick Color</h3>
              <div className="flex flex-wrap gap-2">
                {lipstickColors.map((color) => (
                  <button
                    key={color.hex}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color.hex ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <Button
              onClick={handleTryOn}
              disabled={!uploadedImage || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Applying Lipstick...</span>
                </>
              ) : (
                'Try On Lipstick'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            {modifiedImage ? (
              <div className="space-y-4">
                <img
                  src={modifiedImage}
                  alt="Processed"
                  className="w-full rounded-lg"
                />
                <p className="text-sm text-gray-600 text-center">
                  Lipstick applied successfully!
                </p>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Your processed image will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
