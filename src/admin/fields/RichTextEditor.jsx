import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Underline as UIcon, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote,
  Link2, Unlink, ImagePlus, AlignLeft, AlignCenter, AlignRight, Undo2, Redo2, Minus, Code,
} from 'lucide-react'
import MediaPicker from './MediaPicker'
import { mediaUrl } from '../api'

function Btn({ on, disabled, onClick, label, children }) {
  return (
    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={onClick} disabled={disabled}
      aria-label={label} title={label} aria-pressed={on}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors disabled:opacity-30 ${on ? 'bg-brand text-white' : 'text-ink hover:bg-paper'}`}>
      {children}
    </button>
  )
}
const Sep = () => <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />

/** Rich-text editor (TipTap). Value in/out is HTML; the server sanitises it again on save. */
export default function RichTextEditor({ id, value, onChange, placeholder = 'Start writing…', invalid }) {
  const [picker, setPicker] = useState(false)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    editorProps: { attributes: { id, class: 'cms-prose min-h-[320px] px-5 py-4 outline-none', 'aria-multiline': 'true', role: 'textbox' } },
    onUpdate: ({ editor: ed }) => onChange(ed.isEmpty ? '' : ed.getHTML()),
  })

  // load a different entry's content without resetting while typing
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML() && !(editor.isEmpty && !value)) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  if (!editor) return <div className="h-[380px] animate-pulse rounded-xl bg-paper" />
  const e = editor
  const setLink = () => {
    const prev = e.getAttributes('link').href || 'https://'
    const url = window.prompt('Link address (https://… or /page)', prev)
    if (url === null) return
    if (!url || url === 'https://') e.chain().focus().extendMarkRange('link').unsetLink().run()
    else e.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className={`overflow-hidden rounded-xl border bg-white transition-shadow focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 ${invalid ? 'border-red-400' : 'border-line'}`}>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b border-line bg-white/95 p-1.5 backdrop-blur" role="toolbar" aria-label="Formatting">
        <Btn label="Heading" on={e.isActive('heading', { level: 2 })} onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={18} /></Btn>
        <Btn label="Sub-heading" on={e.isActive('heading', { level: 3 })} onClick={() => e.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={18} /></Btn>
        <Sep />
        <Btn label="Bold (Ctrl+B)" on={e.isActive('bold')} onClick={() => e.chain().focus().toggleBold().run()}><Bold size={17} /></Btn>
        <Btn label="Italic (Ctrl+I)" on={e.isActive('italic')} onClick={() => e.chain().focus().toggleItalic().run()}><Italic size={17} /></Btn>
        <Btn label="Underline (Ctrl+U)" on={e.isActive('underline')} onClick={() => e.chain().focus().toggleUnderline().run()}><UIcon size={17} /></Btn>
        <Btn label="Strikethrough" on={e.isActive('strike')} onClick={() => e.chain().focus().toggleStrike().run()}><Strikethrough size={17} /></Btn>
        <Btn label="Inline code" on={e.isActive('code')} onClick={() => e.chain().focus().toggleCode().run()}><Code size={17} /></Btn>
        <Sep />
        <Btn label="Bullet list" on={e.isActive('bulletList')} onClick={() => e.chain().focus().toggleBulletList().run()}><List size={18} /></Btn>
        <Btn label="Numbered list" on={e.isActive('orderedList')} onClick={() => e.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></Btn>
        <Btn label="Quote" on={e.isActive('blockquote')} onClick={() => e.chain().focus().toggleBlockquote().run()}><Quote size={17} /></Btn>
        <Btn label="Divider" onClick={() => e.chain().focus().setHorizontalRule().run()}><Minus size={18} /></Btn>
        <Sep />
        <Btn label="Align left" on={e.isActive({ textAlign: 'left' })} onClick={() => e.chain().focus().setTextAlign('left').run()}><AlignLeft size={17} /></Btn>
        <Btn label="Align centre" on={e.isActive({ textAlign: 'center' })} onClick={() => e.chain().focus().setTextAlign('center').run()}><AlignCenter size={17} /></Btn>
        <Btn label="Align right" on={e.isActive({ textAlign: 'right' })} onClick={() => e.chain().focus().setTextAlign('right').run()}><AlignRight size={17} /></Btn>
        <Sep />
        <Btn label="Add link" on={e.isActive('link')} onClick={setLink}><Link2 size={17} /></Btn>
        <Btn label="Remove link" disabled={!e.isActive('link')} onClick={() => e.chain().focus().unsetLink().run()}><Unlink size={17} /></Btn>
        <Btn label="Insert image" onClick={() => setPicker(true)}><ImagePlus size={17} /></Btn>
        <Sep />
        <Btn label="Undo (Ctrl+Z)" disabled={!e.can().undo()} onClick={() => e.chain().focus().undo().run()}><Undo2 size={17} /></Btn>
        <Btn label="Redo (Ctrl+Y)" disabled={!e.can().redo()} onClick={() => e.chain().focus().redo().run()}><Redo2 size={17} /></Btn>
      </div>
      <EditorContent editor={editor} />
      <div className="flex justify-end border-t border-line bg-paper px-4 py-1.5 text-xs text-muted">
        {e.storage.characterCount?.words?.() ?? e.getText().trim().split(/\s+/).filter(Boolean).length} words
      </div>
      {picker && (
        <MediaPicker onClose={() => setPicker(false)} imagesOnly
          onSelect={(m) => { setPicker(false); e.chain().focus().setImage({ src: mediaUrl(m.url), alt: m.alt || '' }).run() }} />
      )}
    </div>
  )
}
