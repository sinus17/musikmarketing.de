import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/admin/DashboardLayout'
import { supabase } from '../../lib/supabase'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Chip,
} from '@mui/material'

interface GeneratedArticle {
  title: string
  excerpt: string
  content: string
  videoId: string
  tags: string[]
}

export default function YouTubeArticleGenerator() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Input states
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [srtContent, setSrtContent] = useState('')
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null)
  
  // Form states for editing
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    author: 'musikmarketing.de',
    tags: [] as string[],
  })
  const [tagInput, setTagInput] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const steps = ['YouTube Video', 'SRT Skript', 'Artikel generieren', 'Review & Speichern']

  // Parse SRT file
  const parseSRT = (content: string): string => {
    const lines = content.split('\n')
    let text = ''
    let isTextLine = false
    
    for (const line of lines) {
      const trimmed = line.trim()
      
      // Skip empty lines, numbers, and timestamp lines
      if (!trimmed) {
        isTextLine = false
        continue
      }
      
      // Check if it's a timestamp line (contains -->)
      if (trimmed.includes('-->')) {
        isTextLine = true
        continue
      }
      
      // Check if it's just a number (cue identifier)
      if (/^\d+$/.test(trimmed)) {
        continue
      }
      
      // This is actual subtitle text
      if (isTextLine) {
        // Remove HTML tags
        const cleanText = trimmed.replace(/<[^>]*>/g, '')
        if (cleanText) {
          text += cleanText + ' '
        }
      }
    }
    
    return text.trim()
  }

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  // Generate article from transcript using AI simulation
  // In production, this would call an AI API
  const generateArticleFromTranscript = (transcript: string, videoId: string): GeneratedArticle => {
    // Create a comprehensive article structure
    const words = transcript.split(' ')
    console.log(`Transcript word count: ${words.length}`)
    
    // Generate title based on first 10 words
    const titleWords = words.slice(0, 10).join(' ')
    const title = titleWords.charAt(0).toUpperCase() + titleWords.slice(1) + ' - Komplette Analyse'
    
    // Generate excerpt
    const excerpt = transcript.substring(0, 200) + '...'
    
    // Create structured article content
    const sections = [
      {
        heading: 'Einführung',
        content: `In diesem Artikel analysieren wir das Thema detailliert und geben praktische Einblicke. ${transcript.substring(0, 500)}`
      },
      {
        heading: 'Die wichtigsten Punkte',
        content: generateBulletPoints(transcript)
      },
      {
        heading: 'Detaillierte Analyse',
        content: expandContent(transcript, 800)
      },
      {
        heading: 'Praktische Umsetzung',
        content: generatePracticalSection(transcript)
      },
      {
        heading: 'Häufige Fragen',
        content: generateFAQSection(transcript)
      },
      {
        heading: 'Zusammenfassung',
        content: `Zusammenfassend lässt sich sagen: ${transcript.substring(transcript.length - 300)} Das Video bietet wertvolle Einblicke für Musiker und Artists.`
      }
    ]
    
    // Build HTML content
    let content = `<h1>${title}</h1>\n\n`
    
    // Add video embed
    content += `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 2rem 0;">\n`
    content += `  <iframe\n`
    content += `    src="https://www.youtube.com/embed/${videoId}"\n`
    content += `    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"\n`
    content += `    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n`
    content += `    allowfullscreen\n`
    content += `  ></iframe>\n`
    content += `</div>\n\n`
    
    // Add sections
    for (const section of sections) {
      content += `<h2>${section.heading}</h2>\n`
      content += `<p>${section.content}</p>\n\n`
    }
    
    // Add footer
    content += `<hr style="margin: 3rem 0; border-color: #333;" />\n\n`
    content += `<div style="background: #1a1a1a; padding: 2rem; border-radius: 8px; border: 1px solid #333;">\n`
    content += `  <h3>Mehr Musikmarketing Tipps</h3>\n`
    content += `  <p>Möchtest du noch mehr über Musikmarketing lernen? Entdecke unsere anderen Artikel und Videos für Artists.</p>\n`
    content += `  <p><a href="/blog" style="color: #90ddf0;">→ Alle Blog-Artikel ansehen</a></p>\n`
    content += `</div>\n`
    
    // Calculate target word count
    const targetWordCount = 3000
    const currentContent = content.replace(/<[^>]*>/g, '')
    const currentWords = currentContent.split(' ').length
    
    // If needed, add more content to reach ~3000 words
    if (currentWords < targetWordCount) {
      const additionalSections = Math.ceil((targetWordCount - currentWords) / 400)
      for (let i = 0; i < additionalSections; i++) {
        content += `\n<h2>Vertiefung ${i + 1}</h2>\n`
        content += `<p>${expandContent(transcript, 400)}</p>\n\n`
      }
    }
    
    return {
      title,
      excerpt,
      content,
      videoId,
      tags: ['YouTube', 'Video', 'Musikmarketing', 'Tutorial', 'Guide']
    }
  }

  // Helper to generate bullet points
  const generateBulletPoints = (text: string): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20)
    let bullets = '<ul>\n'
    for (let i = 0; i < Math.min(5, sentences.length); i++) {
      bullets += `  <li>${sentences[i].trim()}</li>\n`
    }
    bullets += '</ul>'
    return bullets
  }

  // Helper to expand content
  const expandContent = (text: string, targetLength: number): string => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    let result = ''
    let currentLength = 0
    
    for (const sentence of sentences) {
      if (currentLength >= targetLength) break
      result += sentence.trim() + '. '
      currentLength += sentence.split(' ').length
    }
    
    // Add analysis commentary
    result += `\n\nDieser Abschnitt bietet tiefgehende Einblicke in die Materie. `
    result += `Die praktische Anwendung dieser Strategien zeigt sich in der täglichen Arbeit von Artists. `
    result += `Wichtig ist dabei, die richtigen Tools und Methoden zu kennen. `
    result += `Mit kontinuierlicher Umsetzung lassen sich messbare Ergebnisse erzielen. `
    
    return result
  }

  // Helper to generate practical section
  const generatePracticalSection = (text: string): string => {
    return `
      <p>Die Umsetzung in der Praxis erfordert einen strukturierten Ansatz:</p>
      <ol>
        <li><strong>Analyse:</strong> Bewerte deine aktuelle Situation und identifiziere Schwachstellen</li>
        <li><strong>Planung:</strong> Erstelle einen konkreten Aktionsplan mit Zeitfenstern</li>
        <li><strong>Umsetzung:</strong> Führe die geplanten Maßnahmen Schritt für Schritt durch</li>
        <li><strong>Monitoring:</strong> Tracke deine Fortschritte und passe bei Bedarf an</li>
        <li><strong>Optimierung:</strong> Verbessere kontinuierlich basierend auf Daten</li>
      </ol>
      <p>${text.substring(0, 300)}</p>
    `
  }

  // Helper to generate FAQ section
  const generateFAQSection = (text: string): string => {
    return `
      <h4>F: Was ist der Hauptpunkt dieses Videos?</h4>
      <p>A: ${text.substring(0, 200)}...</p>
      
      <h4>F: Wie kann ich das Gelernte umsetzen?</h4>
      <p>A: Starte mit kleinen Schritten. Fokussiere dich auf einen Aspekt nach dem anderen.</p>
      
      <h4>F: Welche Tools werden empfohlen?</h4>
      <p>A: Die Auswahl hängt von deinen spezifischen Bedürfnissen ab. Experimentiere und finde heraus, was für dich funktioniert.</p>
    `
  }

  // SRT file drop handler
  const onSrtDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    
    if (!file.name.endsWith('.srt')) {
      setError('Bitte eine .srt Datei hochladen')
      return
    }
    
    try {
      const text = await file.text()
      setSrtContent(text)
      setError('')
    } catch (err) {
      setError('Fehler beim Lesen der SRT Datei')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onSrtDrop,
    accept: {
      'application/x-subrip': ['.srt'],
      'text/plain': ['.srt'],
    },
    maxFiles: 1,
  })

  // Generate article
  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    
    try {
      const videoId = extractVideoId(youtubeUrl)
      if (!videoId) {
        throw new Error('Ungültige YouTube URL')
      }
      
      if (!srtContent) {
        throw new Error('Bitte zuerst eine SRT Datei hochladen')
      }
      
      const transcript = parseSRT(srtContent)
      if (transcript.length < 100) {
        throw new Error('Transkript zu kurz oder ungültiges Format')
      }
      
      const article = generateArticleFromTranscript(transcript, videoId)
      setGeneratedArticle(article)
      
      // Pre-fill form
      const slug = article.title
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60)
      
      setFormData({
        title: article.title,
        slug,
        excerpt: article.excerpt,
        content: article.content,
        status: 'draft',
        author: 'musikmarketing.de',
        tags: article.tags,
      })
      
      // Fetch video thumbnail for cover image
      setCoverImage(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
      
      setActiveStep(3)
    } catch (err: any) {
      setError(err.message || 'Fehler bei der Generierung')
    } finally {
      setLoading(false)
    }
  }

  // Save article
  const handleSave = async () => {
    setLoading(true)
    setError('')
    
    try {
      const postData = {
        ...formData,
        cover_image: coverImage || null,
        published_date: formData.status === 'published' ? new Date().toISOString() : null,
      }
      
      const { error } = await supabase.from('musikmarketing_de_posts').insert([postData])
      
      if (error) throw error
      
      navigate('/admin/blog')
    } catch (err: any) {
      setError(err.message || 'Fehler beim Speichern')
    } finally {
      setLoading(false)
    }
  }

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

  // Step 1: YouTube URL
  const renderStep1 = () => (
    <Box>
      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        YouTube Video URL
      </Typography>
      <TextField
        fullWidth
        label="YouTube Video URL *"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=..."
        sx={{ ...inputStyles, mb: 3 }}
      />
      <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 2 }}>
        Unterstützte Formate: youtube.com/watch?v=..., youtu.be/...
      </Typography>
      <Button
        variant="contained"
        onClick={() => setActiveStep(1)}
        disabled={!extractVideoId(youtubeUrl)}
        sx={{
          bgcolor: '#fff',
          color: '#000',
          '&:hover': { bgcolor: '#e0e0e0' },
          '&:disabled': { bgcolor: '#333', color: '#666' },
        }}
      >
        Weiter zu SRT Upload
      </Button>
    </Box>
  )

  // Step 2: SRT Upload
  const renderStep2 = () => (
    <Box>
      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        SRT Skript Datei hochladen
      </Typography>
      
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
        {srtContent ? (
          <Typography sx={{ color: '#4caf50' }}>
            ✅ SRT Datei geladen ({srtContent.length} Zeichen)
          </Typography>
        ) : (
          <>
            <Typography sx={{ color: '#666' }}>
              SRT Datei hierher ziehen oder klicken zum Auswählen
            </Typography>
            <Typography variant="caption" sx={{ color: '#555' }}>
              Nur .srt Dateien
            </Typography>
          </>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => setActiveStep(0)}
          sx={{
            bgcolor: '#2a2a2a',
            color: '#fff',
            '&:hover': { bgcolor: '#333' },
          }}
        >
          Zurück
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(2)}
          disabled={!srtContent}
          sx={{
            bgcolor: '#fff',
            color: '#000',
            '&:hover': { bgcolor: '#e0e0e0' },
            '&:disabled': { bgcolor: '#333', color: '#666' },
          }}
        >
          Artikel generieren
        </Button>
      </Box>
    </Box>
  )

  // Step 3: Generate
  const renderStep3 = () => (
    <Box>
      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
        Artikel generieren
      </Typography>
      <Typography sx={{ color: '#999', mb: 3 }}>
        Aus dem SRT-Skript wird ein ca. 3000 Wörter langer SEO-optimierter Artikel generiert.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => setActiveStep(1)}
          sx={{
            bgcolor: '#2a2a2a',
            color: '#fff',
            '&:hover': { bgcolor: '#333' },
          }}
        >
          Zurück
        </Button>
        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={loading}
          sx={{
            bgcolor: '#fff',
            color: '#000',
            '&:hover': { bgcolor: '#e0e0e0' },
            '&:disabled': { bgcolor: '#333', color: '#666' },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Artikel generieren'}
        </Button>
      </Box>
    </Box>
  )

  // Step 4: Review and Save
  const renderStep4 = () => (
    <Box>
      <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
        Review & Speichern
      </Typography>
      
      {generatedArticle && (
        <>
          <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333', mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: '#666', mb: 1 }}>
                Video Vorschau
              </Typography>
              <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${generatedArticle.videoId}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen={true}
                />
              </Box>
            </CardContent>
          </Card>
          
          {/* Edit Form */}
          <TextField
            fullWidth
            label="Titel *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ ...inputStyles, mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Slug *"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            sx={{ ...inputStyles, mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            multiline
            rows={3}
            sx={{ ...inputStyles, mb: 2 }}
          />
          
          {/* Tags */}
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
          
          {/* Content Preview */}
          <Paper sx={{ bgcolor: '#0a0a0a', p: 2, mb: 3, maxHeight: 400, overflow: 'auto' }}>
            <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1 }}>
              Artikel Content Vorschau (erste 1000 Zeichen):
            </Typography>
            <Typography sx={{ color: '#bbb', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {formData.content.substring(0, 1000)}...
            </Typography>
          </Paper>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => setActiveStep(2)}
              sx={{
                bgcolor: '#2a2a2a',
                color: '#fff',
                '&:hover': { bgcolor: '#333' },
              }}
            >
              Zurück
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{
                bgcolor: '#fff',
                color: '#000',
                '&:hover': { bgcolor: '#e0e0e0' },
                '&:disabled': { bgcolor: '#333', color: '#666' },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Artikel speichern'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )

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
              mb: 2,
            }}
          >
            YouTube → Artikel Generator
          </Typography>
          
          <Typography sx={{ color: '#999', mb: 4 }}>
            Wandle YouTube-Videos mit SRT-Skript in SEO-optimierte Blog-Artikel um (~3000 Wörter)
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3, bgcolor: '#1a1a1a', color: '#f44336' }}>
              {error}
            </Alert>
          )}
          
          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            sx={{
              mb: 4,
              '& .MuiStepLabel-label': { color: '#666' },
              '& .MuiStepLabel-label.Mui-active': { color: '#fff' },
              '& .MuiStepLabel-label.Mui-completed': { color: '#4caf50' },
              '& .MuiStepIcon-root': { color: '#333' },
              '& .MuiStepIcon-root.Mui-active': { color: '#fff' },
              '& .MuiStepIcon-root.Mui-completed': { color: '#4caf50' },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {/* Step Content */}
          <Paper
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: 2,
              p: 4,
            }}
          >
            {activeStep === 0 && renderStep1()}
            {activeStep === 1 && renderStep2()}
            {activeStep === 2 && renderStep3()}
            {activeStep === 3 && renderStep4()}
          </Paper>
        </Box>
      </Box>
    </DashboardLayout>
  )
}
