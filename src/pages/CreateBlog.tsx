
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Link as LinkIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const CreateBlog = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const [loading, setLoading] = useState(false);
  const [imageUploadMode, setImageUploadMode] = useState<'url' | 'upload'>('url');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image_url: ''
  });

  const categories = [
    'entertainment',
    'health',
    'sport',
    'lifestyle',
    'food',
    'technology',
    'business'
  ];

  useEffect(() => {
    if (editId) {
      fetchBlogForEdit();
    }
  }, [editId]);

  const fetchBlogForEdit = async () => {
    try {
      const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('id', parseInt(editId || '0'))
        .eq('author_id', user?.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Blog not found or you don't have permission to edit it.",
          variant: "destructive",
        });
        navigate('/my-blogs');
        return;
      }

      setFormData({
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || '',
        image_url: data.image_url || ''
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setUploadedImageUrl(publicUrl);
      setFormData(prev => ({
        ...prev,
        image_url: publicUrl
      }));

      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a blog.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        image_url: formData.image_url,
        author_id: user.id,
        published: true
      };

      if (editId) {
        const { error } = await supabase
          .from('blog')
          .update(blogData)
          .eq('id', parseInt(editId))
          .eq('author_id', user.id);

        if (error) throw error;

        toast({
          title: "Blog Updated!",
          description: "Your blog has been updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('blog')
          .insert(blogData);

        if (error) throw error;

        toast({
          title: "Blog Created!",
          description: "Your blog has been published successfully.",
        });
      }

      navigate('/my-blogs');
    } catch (error: any) {
      toast({
        title: `Failed to ${editId ? 'update' : 'create'} blog`,
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              {editId ? 'Edit Blog' : t('createBlog')}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter blog title"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {t(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Excerpt
                </label>
                <Textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  placeholder="Write a brief excerpt of your blog..."
                  rows={3}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Image
                </label>
                
                <div className="mb-4">
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant={imageUploadMode === 'url' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setImageUploadMode('url')}
                      className="flex items-center space-x-2"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>Image URL</span>
                    </Button>
                    <Button
                      type="button"
                      variant={imageUploadMode === 'upload' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setImageUploadMode('upload')}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </div>

                {imageUploadMode === 'url' ? (
                  <Input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="e.g., https://images.unsplash.com/photo-1518770660439-4636190af475"
                    className="w-full"
                  />
                ) : (
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                    />
                    {uploadedImageUrl && (
                      <div className="mt-4">
                        <img
                          src={uploadedImageUrl}
                          alt="Uploaded preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content
                </label>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Write your blog content here..."
                  rows={12}
                  className="w-full"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (editId ? 'Updating...' : 'Publishing...') : (editId ? 'Update Blog' : 'Publish Blog')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/my-blogs')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CreateBlog;
