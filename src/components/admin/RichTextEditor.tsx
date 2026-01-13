import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Box, Button, ButtonGroup } from '@mui/material'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
        style: 'min-height: 400px; padding: 16px; color: #fff;',
      },
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Bild-URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const url = window.prompt('URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    children 
  }: { 
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode 
  }) => (
    <Button
      onClick={onClick}
      size="small"
      sx={{
        bgcolor: isActive ? '#fff' : '#2a2a2a',
        color: isActive ? '#000' : '#999',
        '&:hover': { bgcolor: isActive ? '#e0e0e0' : '#333' },
        textTransform: 'none',
        minWidth: 'auto',
        px: 1.5,
      }}
    >
      {children}
    </Button>
  )

  return (
    <Box sx={{ border: '1px solid #333', borderRadius: 2, overflow: 'hidden', bgcolor: '#0a0a0a' }}>
      {/* Toolbar */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, p: 1.5, borderBottom: '1px solid #333', bgcolor: '#1a1a1a' }}>
        <ButtonGroup size="small">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            Bold
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            Italic
          </ToolbarButton>
        </ButtonGroup>

        <ButtonGroup size="small">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
          >
            H3
          </ToolbarButton>
        </ButtonGroup>

        <ButtonGroup size="small">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            • Liste
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          >
            1. Liste
          </ToolbarButton>
        </ButtonGroup>

        <ButtonGroup size="small">
          <ToolbarButton
            onClick={setLink}
            isActive={editor.isActive('link')}
          >
            Link
          </ToolbarButton>
          <ToolbarButton onClick={addImage}>
            Bild
          </ToolbarButton>
        </ButtonGroup>
      </Box>

      {/* Editor */}
      <EditorContent editor={editor} />
    </Box>
  )
}
