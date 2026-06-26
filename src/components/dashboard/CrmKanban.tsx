"use client";

import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Phone, Globe, Star, X, MessageSquare, DollarSign, CheckCircle } from "lucide-react";
import { cn, PIPELINE_STAGES, formatSAR } from "@/lib/utils";
import toast from "react-hot-toast";

interface Lead {
  id: string; businessName: string; category: string | null; city: string | null;
  phone: string | null; website: string | null; rating: number | null;
  websiteStatus: string; priority: string;
}

interface CrmNote { id: string; content: string; createdAt: string; }

interface CrmRecord {
  id: string; leadId: string; stage: string; agreedPrice: number;
  hostingActive: boolean; upsellServices: string[];
  lead: Lead;
  assigned: { id: string; name: string | null } | null;
  notes: CrmNote[];
}

interface Props { initialRecords: CrmRecord[]; }

export function CrmKanban({ initialRecords }: Props) {
  const [records, setRecords] = useState<CrmRecord[]>(initialRecords);
  const [selected, setSelected] = useState<CrmRecord | null>(null);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);

  const byStage = (stageId: string) => records.filter(r => r.stage === stageId);

  const onDragEnd = useCallback(async (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStage = destination.droppableId;

    const rec = records.find(r => r.id === draggableId);
    if (!rec || rec.stage === newStage) return;

    // Optimistic update
    setRecords(prev => prev.map(r => r.id === draggableId ? { ...r, stage: newStage } : r));
    if (selected?.id === draggableId) setSelected(s => s ? { ...s, stage: newStage } : s);

    try {
      const res = await fetch("/api/crm", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: draggableId, stage: newStage }),
      });
      if (!res.ok) throw new Error();
      toast.success("Stage updated");
    } catch {
      // Revert on failure
      setRecords(prev => prev.map(r => r.id === draggableId ? { ...r, stage: rec.stage } : r));
      toast.error("Failed to update stage");
    }
  }, [records, selected]);

  const saveNote = async () => {
    if (!selected || !noteText.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/crm", {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: selected.id, note: noteText.trim() }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setRecords(prev => prev.map(r => r.id === updated.id ? updated : r));
      setSelected(updated);
      setNoteText("");
      toast.success("Note saved");
    } catch {
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  const toggleHosting = async (rec: CrmRecord) => {
    const updated = { ...rec, hostingActive: !rec.hostingActive };
    setRecords(prev => prev.map(r => r.id === rec.id ? updated : r));
    if (selected?.id === rec.id) setSelected(updated);

    await fetch("/api/crm", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id: rec.id, hostingActive: !rec.hostingActive }),
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage) => {
            const cards = byStage(stage.id);
            return (
              <div key={stage.id} className="flex-shrink-0 w-64">
                {/* Column header */}
                <div
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl mb-3"
                  style={{ background: `${stage.color}18`, borderLeft: `3px solid ${stage.color}` }}
                >
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{stage.label}</div>
                    <div className="text-xs" style={{ color: stage.color }}>{stage.labelAr}</div>
                  </div>
                  <span
                    className="text-xs font-black px-2 py-1 rounded-full text-white"
                    style={{ background: stage.color }}
                  >
                    {cards.length}
                  </span>
                </div>

                {/* Droppable column */}
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "min-h-24 rounded-xl transition-colors space-y-2 p-1",
                        snapshot.isDraggingOver && "bg-white/50 dark:bg-white/5 ring-2 ring-inset"
                      )}
                      style={snapshot.isDraggingOver ? { ringColor: stage.color } : {}}
                    >
                      {cards.map((rec, index) => (
                        <Draggable key={rec.id} draggableId={rec.id} index={index}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              onClick={() => setSelected(rec)}
                              className={cn(
                                "bg-white dark:bg-[#1a1a2e] rounded-xl p-3 border cursor-pointer group transition-all",
                                snap.isDragging
                                  ? "shadow-xl rotate-1 border-[#e94560]"
                                  : "border-gray-100 dark:border-white/10 hover:border-[#e94560]/40 hover:shadow-md"
                              )}
                            >
                              <div className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                                {rec.lead.businessName}
                              </div>

                              {rec.lead.city && (
                                <div className="text-gray-400 dark:text-white/30 text-xs mb-2">{rec.lead.city}</div>
                              )}

                              <div className="flex items-center justify-between">
                                <span className={cn(
                                  "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                                  rec.lead.priority === "high"   && "badge-high",
                                  rec.lead.priority === "medium" && "badge-medium",
                                  rec.lead.priority === "low"    && "badge-low",
                                )}>
                                  {rec.lead.priority}
                                </span>
                                <span className="text-xs font-bold text-[#0f3460] dark:text-blue-400">
                                  {formatSAR(rec.agreedPrice)}
                                </span>
                              </div>

                              {rec.notes.length > 0 && (
                                <div className="mt-2 text-xs text-gray-400 dark:text-white/30 truncate border-t border-gray-50 dark:border-white/5 pt-1.5">
                                  💬 {rec.notes[0].content}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end" onClick={() => setSelected(null)}>
          <div
            className="h-full w-full max-w-md bg-white dark:bg-[#1a1a2e] shadow-2xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/10">
              <div>
                <h3 className="font-black text-gray-900 dark:text-white">{selected.lead.businessName}</h3>
                <p className="text-gray-400 dark:text-white/40 text-xs">{selected.lead.city} · {selected.lead.category}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-5">
              {/* Stage */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-2 block">Pipeline Stage</label>
                <div className="flex flex-wrap gap-2">
                  {PIPELINE_STAGES.map(s => (
                    <button
                      key={s.id}
                      onClick={async () => {
                        if (s.id === selected.stage) return;
                        const res = await fetch("/api/crm", {
                          method:  "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body:    JSON.stringify({ id: selected.id, stage: s.id }),
                        });
                        if (res.ok) {
                          const updated = await res.json();
                          setRecords(prev => prev.map(r => r.id === updated.id ? updated : r));
                          setSelected(updated);
                          toast.success("Stage updated");
                        }
                      }}
                      className={cn(
                        "text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all",
                        selected.stage === s.id
                          ? "text-white shadow-md"
                          : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/50 hover:bg-gray-200"
                      )}
                      style={selected.stage === s.id ? { background: s.color } : {}}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-2 block">Contact</label>
                <div className="flex gap-3">
                  {selected.lead.phone && (
                    <a href={`tel:${selected.lead.phone}`}
                      className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-100">
                      <Phone size={14} /> {selected.lead.phone}
                    </a>
                  )}
                  {selected.lead.website && (
                    <a href={selected.lead.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100">
                      <Globe size={14} /> Website
                    </a>
                  )}
                </div>
              </div>

              {/* Financials */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-2 block">Financials</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-gray-400 dark:text-white/40 text-xs mb-1">
                      <DollarSign size={12} /> Website Price
                    </div>
                    <div className="font-black text-gray-900 dark:text-white">{formatSAR(selected.agreedPrice)}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={12} className={selected.hostingActive ? "text-green-500" : "text-gray-300"} />
                      <span className="text-xs text-gray-400 dark:text-white/40">Hosting Active</span>
                    </div>
                    <button
                      onClick={() => toggleHosting(selected)}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors",
                        selected.hostingActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-white/30"
                      )}
                    >
                      {selected.hostingActive ? "50 SAR/mo ✓" : "Inactive"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Lead details */}
              {selected.lead.rating && (
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-2 block">Google Rating</label>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#f5a623] fill-[#f5a623]" />
                    <span className="font-bold text-gray-900 dark:text-white">{selected.lead.rating}</span>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-2 block">
                  <MessageSquare size={12} className="inline mr-1" /> Notes
                </label>
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {selected.notes.length === 0 ? (
                    <p className="text-gray-300 dark:text-white/20 text-xs">No notes yet</p>
                  ) : selected.notes.map(n => (
                    <div key={n.id} className="bg-gray-50 dark:bg-white/5 rounded-lg p-3 text-xs text-gray-700 dark:text-white/70">
                      {n.content}
                      <div className="text-gray-300 dark:text-white/20 mt-1">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && saveNote()}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  />
                  <button
                    onClick={saveNote}
                    disabled={saving || !noteText.trim()}
                    className="bg-[#e94560] text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#c73652] disabled:opacity-40 transition-colors"
                  >
                    {saving ? "..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
