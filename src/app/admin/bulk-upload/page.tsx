import BulkAvatarUploader from '@/components/asset/BulkAvatarUploader';

export default function BulkUploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Bulk Avatar Upload</h1>
      <BulkAvatarUploader />
    </div>
  );
}