
import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';
import AnimatedButton from './AnimatedButton';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    const savedNotes = getFromLocalStorage<Note[]>('notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);
  
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    saveToLocalStorage('notes', updatedNotes);
  };
  
  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      timestamp: Date.now(),
    };
    
    const updatedNotes = [...notes, note];
    saveNotes(updatedNotes);
    setNewNote('');
    
    toast({
      title: "Note added",
      description: "Your note has been saved",
    });
  };
  
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed",
      variant: "destructive",
    });
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNote();
            }
          }}
        />
        <AnimatedButton 
          onClick={addNote} 
          variant="glow"
          animationType="pulse"
        >
          Add
        </AnimatedButton>
      </div>
      
      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-center text-muted-foreground animate-fade-in">No notes yet. Add one!</p>
        ) : (
          notes.map((note, index) => (
            <div
              key={note.id}
              className={cn(
                "p-4 rounded-lg border bg-card text-card-foreground shadow hover-lift",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="mb-1">{note.text}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{formatDate(note.timestamp)}</span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-destructive hover:text-destructive/80 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;
