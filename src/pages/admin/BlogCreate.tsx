import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/admin/DashboardLayout'
import RichTextEditor from '../../components/admin/RichTextEditor'
import { supabase } from '../../lib/supabase'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'

export default function BlogCreate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [coverImage, setCoverImage] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    published_date: new Date().toISOString().split('T')[0],
    author: 'musikmarketing.de',
    tags: [] as string[],
  })

  const [tagInput, setTagInput] = useState('')

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    setFormData({ ...formData, title, slug })
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `blog/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('musikmarketing-blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('musikmarketing-blog-images')
        .getPublicUrl(filePath)

      setCoverImage(publicUrl)
    } catch (error: any) {
      console.error('Upload error:', error)
      setError('Fehler beim Hochladen des Bildes')
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
  })

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const postData = {
        ...formData,
        cover_image: coverImage || null,
        published_date: formData.status === 'published' ? formData.published_date : null,
      }

      const { error } = await supabase.from('musikmarketing_de_posts').insert([postData])

      if (error) throw error

      navigate('/admin/blog')
    } catch (error: any) {
      console.error('Error:', error)
      setError(error.message || 'Fehler beim Erstellen des Posts')
    } finally {
      setLoading(false)
    }
  }

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#0a0a0a',
      '& fieldset': { borderColor: '#333' },
      '&:hover fieldset': { borderColor: '#555' },
      '&.Mui-focused fieldset': { borderColor: '#fff' },
    },
    '& .MuiInputLabel-root': { color: '#666' },
    '& .MuiInputBase-input': { color: '#fff' },
    '& .MuiSelect-icon': { color: '#666' },
  }

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 2,
              mb: 4,
            }}
          >
            Neuer Blog-Post
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <TextField
              fullWidth
              label="Titel *"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              sx={{ ...inputStyles, mb: 3 }}
              placeholder="Blog-Post Titel"
            />

            {/* Slug */}
            <TextField
              fullWidth
              label="Slug *"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              sx={{ ...inputStyles, mb: 1 }}
              placeholder="blog-post-slug"
            />
            <Typography variant="caption" sx={{ color: '#666', mb: 3, display: 'block' }}>
              URL: /blog/{formData.slug || 'slug'}
            </Typography>

            {/* Excerpt */}
            <TextField
              fullWidth
              label="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              multiline
              rows={3}
              sx={{ ...inputStyles, mb: 3 }}
              placeholder="Kurze Zusammenfassung..."
            />

            {/* Cover Image */}
            <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
              Cover Image
            </Typography>
            {coverImage ? (
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  component="img"
                  src={coverImage}
                  alt="Cover"
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
                <Button
                  onClick={() => setCoverImage('')}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: '#f44336',
                    color: '#fff',
                    '&:hover': { bgcolor: '#d32f2f' },
                    textTransform: 'none',
                  }}
                >
                  Entfernen
                </Button>
              </Box>
            ) : (
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? '#fff' : '#333',
                  bgcolor: isDragActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  mb: 3,
                  '&:hover': { borderColor: '#555' },
                }}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : (
                  <>
                    <Typography sx={{ color: '#666' }}>
                      Bild hierher ziehen oder klicken zum Auswählen
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#555' }}>
                      PNG, JPG, GIF bis 10MB
                    </Typography>
                  </>
                )}
              </Box>
            )}

            {/* Content */}
            <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
              Inhalt *
            </Typography>
            <Box sx={{ mb: 3 }}>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
            </Box>

            {/* Author */}
            <TextField
              fullWidth
              label="Autor"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              sx={{ ...inputStyles, mb: 3 }}
            />

            {/* Tags */}
            <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Tag hinzufügen..."
                size="small"
                sx={{ ...inputStyles, flex: 1 }}
              />
              <Button
                onClick={addTag}
                sx={{
                  bgcolor: '#2a2a2a',
                  color: '#fff',
                  '&:hover': { bgcolor: '#333' },
                  textTransform: 'none',
                }}
              >
                Hinzufügen
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {formData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  sx={{
                    bgcolor: '#2a2a2a',
                    color: '#fff',
                    '& .MuiChip-deleteIcon': { color: '#f44336' },
                  }}
                />
              ))}
            </Box>

            {/* Status & Date */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <FormControl sx={inputStyles}>
                <InputLabel>Status *</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  label="Status *"
                >
                  <MenuItem value="draft">Entwurf</MenuItem>
                  <MenuItem value="published">Veröffentlicht</MenuItem>
                </Select>
              </FormControl>

              <TextField
                type="date"
                label="Veröffentlichungsdatum"
                value={formData.published_date}
                onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                sx={inputStyles}
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                disabled={loading}
                sx={{
                  bgcolor: '#fff',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#e0e0e0' },
                  '&:disabled': { bgcolor: '#555', color: '#999' },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Post erstellen'}
              </Button>
              <Button
                onClick={() => navigate('/admin/blog')}
                sx={{
                  bgcolor: '#2a2a2a',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                Abbrechen
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </DashboardLayout>
  )
}
