import React, { useState, useEffect, useMemo } from 'react';

/* ============================
   Utilidades
   ============================ */
// Reordenar listas (drag & drop)
function reorderList(arr, from, to) {
  const copy = Array.isArray(arr) ? arr.slice() : [];
  if (
    copy.length === 0 ||
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= copy.length ||
    to >= copy.length
  )
    return copy;
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/* ============================
   Iconos SVG personalizados
   ============================ */
const ChevronRight = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const ChevronDown = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const Plus = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
const Edit2 = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const SaveIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
);
const X = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const Search = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const Users = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const FileText = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const Headphones = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);
const Package = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);
const MessageCircle = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);
const Heart = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);
const Download = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);
const Upload = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const Image = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const PlusCircle = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const LinkIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);
const Paperclip = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    />
  </svg>
);
const Pencil = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

/* ============================
   Componentes auxiliares
   ============================ */
const Modal = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[min(560px,92vw)]">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Cerrar" className="p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-3">{children}</div>
        <div className="p-3 border-t flex justify-end gap-2">{actions}</div>
      </div>
    </div>
  );
};

const SectionButton = ({ active, children, onClick, leftIcon: Icon }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded border flex items-center gap-2 ${
      active ? 'bg-red-700 text-white border-red-700' : 'bg-white'
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span className="flex-1">{children}</span>
  </button>
);

const Badge = ({ children, color = 'red' }) => (
  <span
    className={`text-xs px-2 py-0.5 rounded-full border ${
      color === 'red'
        ? 'bg-red-50 text-red-700 border-red-200'
        : 'bg-gray-50 text-gray-700 border-gray-200'
    }`}
  >
    {children}
  </span>
);

/* ============================
   App principal
   ============================ */
const MAX_CENTROS = 10;

const AudiologiaApp = () => {
  // Estado principal
  const [activeSection, setActiveSection] = useState('centros_exclusivos');
  const [activeCentro, setActiveCentro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [companyName, setCompanyName] = useState('AUDIOLOGÍA');

  // Estados varios
  const [showCentroModal, setShowCentroModal] = useState(false);
  const [editingCentroId, setEditingCentroId] = useState(null);
  const [editingCentroNombre, setEditingCentroNombre] = useState('');
  const [editingCentroDelegado, setEditingCentroDelegado] = useState('');
  const [editingCentroAudiologo, setEditingCentroAudiologo] = useState('');
  const [editingCentroFranquiciaSucursal, setEditingCentroFranquiciaSucursal] = useState('Sucursal');

  const [centros, setCentros] = useState([
    { id: 1, nombre: 'Centro Madrid Norte', delegado: 'Ana Martínez', audiologo: 'Dr. García', franquiciaSucursal: 'Franquicia', color: 'bg-blue-100 border-blue-400 text-blue-800' },
    { id: 2, nombre: 'Centro Barcelona Centro', delegado: 'Carlos Ruiz', audiologo: 'Dra. López', franquiciaSucursal: 'Sucursal', color: 'bg-green-100 border-green-400 text-green-800' },
  ]);

  const coloresCentros = [
    'bg-blue-100 border-blue-400 text-blue-800',
    'bg-green-100 border-green-400 text-green-800',
    'bg-purple-100 border-purple-400 text-purple-800',
    'bg-orange-100 border-orange-400 text-orange-800',
    'bg-pink-100 border-pink-400 text-pink-800',
    'bg-indigo-100 border-indigo-400 text-indigo-800',
    'bg-yellow-100 border-yellow-400 text-yellow-800',
    'bg-red-100 border-red-400 text-red-800',
    'bg-teal-100 border-teal-400 text-teal-800',
    'bg-cyan-100 border-cyan-400 text-cyan-800',
    'bg-lime-100 border-lime-400 text-lime-800',
    'bg-rose-100 border-rose-400 text-rose-800',
  ];

  const [data, setData] = useState({
    centros_exclusivos: {
      title: 'CENTROS EXCLUSIVOS',
      icon: FileText,
      color: 'from-red-600 to-red-700',
      requiresCentro: true,
      centrosData: {
        1: {
          customFields: [],
          accionesResultado: [{ id: 1, fecha: '', accion: '', derivacion: 0, cita: 0, observaciones: '' }],
          formaciones: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, fecha: '', asistencia: '', titulo: '', aplicacion: '' })),
          procesosPersonalizados: [{ id: 1, nombrePaquete: '', descripcion: '', puntuacion: '', observaciones: '', fechaVisita: '', archivos: [], enlaces: [] }],
        },
        2: {
          customFields: [],
          accionesResultado: [{ id: 1, fecha: '', accion: '', derivacion: 0, cita: 0, observaciones: '' }],
          formaciones: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, fecha: '', asistencia: '', titulo: '', aplicacion: '' })),
          procesosPersonalizados: [{ id: 1, nombrePaquete: '', descripcion: '', puntuacion: '', observaciones: '', fechaVisita: '', archivos: [], enlaces: [] }],
        },
      },
    },
    centros_flop: { title: 'CENTROS FLOP', icon: Users, color: 'from-gray-600 to-gray-700', customFields: [], items: [] },
    visitas_audio: { title: 'VISITAS AUDIO', icon: Headphones, color: 'from-red-500 to-red-600', customFields: [], items: [] },
    mentoring_audio: { title: 'MENTORING AUDIO', icon: Edit2, color: 'from-gray-700 to-gray-800', customFields: [], items: [] },
    producto_pedidos: { title: 'Producto / Pedidos / Devoluciones', icon: Package, color: 'from-red-700 to-red-800', customFields: [], items: [] },
    comunicacion: { title: 'Comunicación', icon: MessageCircle, color: 'from-gray-500 to-gray-600', customFields: [], items: [] },
    area_social: { title: 'Área Social y Colaboraciones', icon: Heart, color: 'from-red-600 to-red-700', customFields: [], items: [] },
  });

  // Derivados
  const activeData = useMemo(() => data[activeSection], [data, activeSection]);
  const currentData = useMemo(() => {
    if (!activeData) return null;
    if (activeData.requiresCentro) {
      if (!activeCentro) return null;
      return activeData.centrosData?.[activeCentro] || null;
    }
    return activeData;
  }, [activeData, activeCentro]);

  // Subestados de edición
  const [accionesResultadoData, setAccionesResultadoData] = useState([]);
  const [draggedAccionIndex, setDraggedAccionIndex] = useState(null);
  const [formacionesData, setFormacionesData] = useState([]);
  const [draggedFormacionIndex, setDraggedFormacionIndex] = useState(null);
  const [procesosData, setProcesosData] = useState([]);
  const [draggedProcesoIndex, setDraggedProcesoIndex] = useState(null);
  const [newProcesoLinkUrl, setNewProcesoLinkUrl] = useState('');
  const [newProcesoLinkTitle, setNewProcesoLinkTitle] = useState('');
  const [editingProcesoId, setEditingProcesoId] = useState(null);

  // Inicializar el primer centro cuando se carga la app
  useEffect(() => {
    if (activeSection === 'centros_exclusivos' && centros.length > 0 && !activeCentro) {
      setActiveCentro(centros[0].id);
    }
  }, [activeSection, centros, activeCentro]);

  // Cargar datos cuando cambia el centro activo
  useEffect(() => {
    if (activeSection === 'centros_exclusivos' && activeCentro && currentData) {
      setAccionesResultadoData(
        currentData.accionesResultado || [{ id: 1, fecha: '', accion: '', derivacion: 0, cita: 0, observaciones: '' }]
      );
      setFormacionesData(currentData.formaciones || []);
      setProcesosData(
        currentData.procesosPersonalizados || [
          { id: 1, nombrePaquete: '', descripcion: '', puntuacion: '', observaciones: '', fechaVisita: '', archivos: [], enlaces: [] },
        ]
      );
    }
  }, [activeCentro, activeSection, currentData]);

  // ====== AUTOGUARDADO ======
  // Guarda automáticamente en `data` cuando cambian las tablas
  useEffect(() => {
    if (activeSection !== 'centros_exclusivos' || !activeCentro) return;
    setData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        centrosData: {
          ...prev[activeSection].centrosData,
          [activeCentro]: {
            ...prev[activeSection].centrosData[activeCentro],
            accionesResultado: accionesResultadoData,
          }
        }
      }
    }));
  }, [accionesResultadoData, activeCentro, activeSection]);

  useEffect(() => {
    if (activeSection !== 'centros_exclusivos' || !activeCentro) return;
    setData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        centrosData: {
          ...prev[activeSection].centrosData,
          [activeCentro]: {
            ...prev[activeSection].centrosData[activeCentro],
            formaciones: formacionesData,
          }
        }
      }
    }));
  }, [formacionesData, activeCentro, activeSection]);

  useEffect(() => {
    if (activeSection !== 'centros_exclusivos' || !activeCentro) return;
    setData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        centrosData: {
          ...prev[activeSection].centrosData,
          [activeCentro]: {
            ...prev[activeSection].centrosData[activeCentro],
            procesosPersonalizados: procesosData,
          }
        }
      }
    }));
  }, [procesosData, activeCentro, activeSection]);

  // Persistir en localStorage para no perder datos al refrescar
  useEffect(() => {
    try {
      localStorage.setItem('audiologia_state_v1', JSON.stringify({ centros, data, activeCentro }));
    } catch {}
  }, [centros, data, activeCentro]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem('audiologia_state_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.centros) setCentros(parsed.centros);
        if (parsed?.data) setData(parsed.data);
        if (parsed?.activeCentro) setActiveCentro(parsed.activeCentro);
      }
    } catch {}
  }, []);

  /* ------- Acciones-Resultado ------- */
  const addAccion = () => {
    const newId = Math.max(0, ...accionesResultadoData.map((a) => a.id)) + 1;
    setAccionesResultadoData([
      ...accionesResultadoData,
      { id: newId, fecha: '', accion: '', derivacion: 0, cita: 0, observaciones: '' },
    ]);
  };
  const deleteAccion = (id) => {
    if (accionesResultadoData.length > 1) {
      setAccionesResultadoData(accionesResultadoData.filter((a) => a.id !== id));
    }
  };
  const updateAccion = (id, field, value) => {
    setAccionesResultadoData(
      accionesResultadoData.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };
  const handleDragStartAccion = (index) => setDraggedAccionIndex(index);
  const handleDragOverAccion = (e, index) => {
    e.preventDefault();
    if (draggedAccionIndex === null || draggedAccionIndex === index) return;
    setAccionesResultadoData((items) => reorderList(items, draggedAccionIndex, index));
    setDraggedAccionIndex(index);
  };
  const handleDragEndAccion = () => setDraggedAccionIndex(null);

  /* ------- Formaciones ------- */
  const updateFormacion = (id, field, value) => {
    setFormacionesData((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };
  const handleDragStartFormacion = (index) => setDraggedFormacionIndex(index);
  const handleDragOverFormacion = (e, index) => {
    e.preventDefault();
    if (draggedFormacionIndex === null || draggedFormacionIndex === index) return;
    setFormacionesData((items) => reorderList(items, draggedFormacionIndex, index));
    setDraggedFormacionIndex(index);
  };
  const handleDragEndFormacion = () => setDraggedFormacionIndex(null);

  /* ------- Procesos Personalizados ------- */
  const addProceso = () => {
    const newId = Math.max(0, ...procesosData.map((p) => p.id)) + 1;
    setProcesosData([
      ...procesosData,
      { id: newId, nombrePaquete: '', descripcion: '', puntuacion: '', observaciones: '', fechaVisita: '', archivos: [], enlaces: [] },
    ]);
  };
  const deleteProceso = (id) => {
    if (procesosData.length > 1) setProcesosData(procesosData.filter((p) => p.id !== id));
  };
  const updateProceso = (id, field, value) => {
    setProcesosData((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };
  const handleProcesoFileUpload = (procesoId, event) => {
    const files = Array.from(event.target.files || []);
    const newFiles = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      id: Date.now() + Math.random(),
    }));
    setProcesosData((prev) =>
      prev.map((p) => (p.id === procesoId ? { ...p, archivos: [...(p.archivos || []), ...newFiles] } : p))
    );
  };
  const removeProcesoFile = (procesoId, fileId) => {
    setProcesosData((prev) =>
      prev.map((p) => (p.id === procesoId ? { ...p, archivos: (p.archivos || []).filter((f) => f.id !== fileId) } : p))
    );
  };
  const addProcesoLink = (procesoId) => {
    if (newProcesoLinkUrl.trim()) {
      const newLink = {
        url: newProcesoLinkUrl,
        title: newProcesoLinkTitle || newProcesoLinkUrl,
        id: Date.now(),
      };
      setProcesosData((prev) =>
        prev.map((p) => (p.id === procesoId ? { ...p, enlaces: [...(p.enlaces || []), newLink] } : p))
      );
      setNewProcesoLinkUrl('');
      setNewProcesoLinkTitle('');
      setEditingProcesoId(null);
    }
  };
  const removeProcesoLink = (procesoId, linkId) => {
    setProcesosData((prev) =>
      prev.map((p) => (p.id === procesoId ? { ...p, enlaces: (p.enlaces || []).filter((l) => l.id !== linkId) } : p))
    );
  };
  const handleDragStartProceso = (index) => setDraggedProcesoIndex(index);
  const handleDragOverProceso = (e, index) => {
    e.preventDefault();
    if (draggedProcesoIndex === null || draggedProcesoIndex === index) return;
    setProcesosData((items) => reorderList(items, draggedProcesoIndex, index));
    setDraggedProcesoIndex(index);
  };
  const handleDragEndProceso = () => setDraggedProcesoIndex(null);

  /* ------ UI ------ */
  return (
    <div className="grid grid-cols-12 gap-4 p-4 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-4 lg:col-span-3">
        <div className="border rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Secciones</h2>
            <button className="p-1 border rounded" title="Nueva sección (WIP)">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <SectionButton
            active={activeSection === 'centros_exclusivos'}
            onClick={() => setActiveSection('centros_exclusivos')}
            leftIcon={FileText}
          >
            CENTROS EXCLUSIVOS{' '}
            <span className="ml-auto">
              <Badge>{Math.min(centros.length, MAX_CENTROS)}/{MAX_CENTROS}</Badge>
            </span>
          </SectionButton>
          <SectionButton active={activeSection === 'centros_flop'} onClick={() => setActiveSection('centros_flop')} leftIcon={Users}>
            CENTROS FLOP
          </SectionButton>
          <SectionButton active={activeSection === 'visitas_audio'} onClick={() => setActiveSection('visitas_audio')} leftIcon={Headphones}>
            VISITAS AUDIO
          </SectionButton>
          <SectionButton active={activeSection === 'mentoring_audio'} onClick={() => setActiveSection('mentoring_audio')} leftIcon={Edit2}>
            MENTORING AUDIO
          </SectionButton>
          <SectionButton active={activeSection === 'producto_pedidos'} onClick={() => setActiveSection('producto_pedidos')} leftIcon={Package}>
            Producto / Pedidos / Devoluciones
          </SectionButton>
          <SectionButton active={activeSection === 'comunicacion'} onClick={() => setActiveSection('comunicacion')} leftIcon={MessageCircle}>
            Comunicación
          </SectionButton>
          <SectionButton active={activeSection === 'area_social'} onClick={() => setActiveSection('area_social')} leftIcon={Heart}>
            Área Social y Colaboraciones
          </SectionButton>

          {/* Lista de centros si aplica */}
          {activeData?.requiresCentro && (
            <div className="mt-3 space-y-2">
              {centros.slice(0, MAX_CENTROS).map((c) => (
                <div
                  key={c.id}
                  className={`rounded border p-2 text-sm flex items-start gap-2 ${activeCentro === c.id ? 'ring-2 ring-red-400' : ''}`}
                >
                  <button className="flex-1 text-left" onClick={() => setActiveCentro(c.id)}>
                    <div className="font-medium">{c.nombre}</div>
                    <div className="text-gray-500 flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                      <span>👤 {c.delegado}</span>
                      <span>🎧 {c.audiologo}</span>
                      <span>📍 {c.franquiciaSucursal}</span>
                    </div>
                  </button>
                  <div className="flex flex-col gap-1">
                    <button
                      className="p-1 border rounded"
                      title="Editar"
                      onClick={() => {
                        setEditingCentroId(c.id);
                        setEditingCentroNombre(c.nombre);
                        setEditingCentroDelegado(c.delegado);
                        setEditingCentroAudiologo(c.audiologo);
                        setEditingCentroFranquiciaSucursal(c.franquiciaSucursal);
                        setShowCentroModal(true);
                      }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      className="p-1 border rounded text-red-600"
                      title="Eliminar"
                      onClick={() => setCentros((prev) => prev.filter((x) => x.id !== c.id))}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                className={`w-full mt-2 ${centros.length >= MAX_CENTROS ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600'} text-white rounded px-3 py-1.5 flex items-center justify-center gap-1`}
                disabled={centros.length >= MAX_CENTROS}
                onClick={() => {
                  setEditingCentroId(null);
                  setEditingCentroNombre('');
                  setEditingCentroDelegado('');
                  setEditingCentroAudiologo('');
                  setEditingCentroFranquiciaSucursal('Sucursal');
                  setShowCentroModal(true);
                }}
              >
                <Plus className="w-4 h-4" /> Añadir ({Math.min(centros.length, MAX_CENTROS)}/{MAX_CENTROS})
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="col-span-12 md:col-span-8 lg:col-span-9">
        {/* Header principal */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt="logo" className="h-10 w-10 object-contain" />
            ) : (
              <div className="h-10 w-10 rounded bg-gray-200 grid place-items-center text-sm">LOGO</div>
            )}
            <div className="flex items-center gap-2">
              <input
                className="border px-2 py-1 rounded"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                aria-label="Nombre de la empresa"
              />
              {activeData?.requiresCentro && activeCentro && (
                <Badge> {centros.find((c) => c.id === activeCentro)?.nombre || ''} </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="Buscar..."
              className="border px-2 py-1 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar"
            />
          </div>
        </header>

        {/* Encabezado de CENTROS EXCLUSIVOS con DESPLEGABLE de centros */}
        {activeSection === 'centros_exclusivos' && (
          <div className="flex items-center justify-between border rounded-lg p-3 mb-3">
            <h2 className="text-xl font-bold">CENTROS EXCLUSIVOS</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm">Seleccionar centro:</label>
              <select
                className="border rounded px-2 py-1 min-w-[240px]"
                value={activeCentro || ''}
                onChange={(e) => setActiveCentro(Number(e.target.value))}
              >
                {centros.slice(0, MAX_CENTROS).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Contenido de la sección CENTROS EXCLUSIVOS */}
        {activeSection === 'centros_exclusivos' && currentData && (
          <div className="space-y-8">
            {/* Acciones-Resultado */}
            <section className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Acciones-Resultado</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-blue-600 text-white flex items-center gap-1" onClick={addAccion}>
                    <Plus className="w-4 h-4" />Añadir
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-red-600 text-white">
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Acción</th>
                      <th className="p-2 text-left">Derivación</th>
                      <th className="p-2 text-left">Cita</th>
                      <th className="p-2 text-left">Observaciones</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {accionesResultadoData.map((a, idx) => (
                      <tr
                        key={a.id}
                        draggable
                        onDragStart={() => handleDragStartAccion(idx)}
                        onDragOver={(e) => handleDragOverAccion(e, idx)}
                        onDragEnd={handleDragEndAccion}
                        className="border-b"
                      >
                        <td className="p-2">{a.id}</td>
                        <td className="p-2">
                          <input
                            type="date"
                            className="border rounded px-2 py-1"
                            value={a.fecha}
                            onChange={(e) => updateAccion(a.id, 'fecha', e.target.value)}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Descripción..."
                            value={a.accion}
                            onChange={(e) => updateAccion(a.id, 'accion', e.target.value)}
                          />
                        </td>
                        <td className="p-2 w-24">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            value={a.derivacion}
                            onChange={(e) => updateAccion(a.id, 'derivacion', Number(e.target.value))}
                          />
                        </td>
                        <td className="p-2 w-24">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-full"
                            value={a.cita}
                            onChange={(e) => updateAccion(a.id, 'cita', Number(e.target.value))}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Observaciones..."
                            value={a.observaciones}
                            onChange={(e) => updateAccion(a.id, 'observaciones', e.target.value)}
                          />
                        </td>
                        <td className="p-2 text-right">
                          <button
                            className="px-2 py-1 text-red-600"
                            onClick={() => deleteAccion(a.id)}
                            title="Eliminar fila"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Formación Continua */}
            <section className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Formación Continua</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-red-600 text-white">
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">Fecha</th>
                      <th className="p-2 text-left">Asistencia</th>
                      <th className="p-2 text-left">Título Formación</th>
                      <th className="p-2 text-left">Aplicación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formacionesData.map((f, idx) => (
                      <tr
                        key={f.id}
                        draggable
                        onDragStart={() => handleDragStartFormacion(idx)}
                        onDragOver={(e) => handleDragOverFormacion(e, idx)}
                        onDragEnd={handleDragEndFormacion}
                        className="border-b"
                      >
                        <td className="p-2">{f.id}</td>
                        <td className="p-2">
                          <input
                            type="date"
                            className="border rounded px-2 py-1"
                            value={f.fecha}
                            onChange={(e) => updateFormacion(f.id, 'fecha', e.target.value)}
                          />
                        </td>
                        <td className="p-2 w-40">
                          <select
                            className="border rounded px-2 py-1 w-full"
                            value={f.asistencia}
                            onChange={(e) => updateFormacion(f.id, 'asistencia', e.target.value)}
                          >
                            <option value="">-</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                          </select>
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Nombre del curso..."
                            value={f.titulo}
                            onChange={(e) => updateFormacion(f.id, 'titulo', e.target.value)}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            className="border rounded px-2 py-1 w-full"
                            placeholder="¿Cómo se aplicará? o SI/NO"
                            value={f.aplicacion}
                            onChange={(e) => updateFormacion(f.id, 'aplicacion', e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Procesos personalizados */}
            <section className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">Procesos personalizados</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-blue-600 text-white flex items-center gap-1" onClick={addProceso}>
                    <Plus className="w-4 h-4" />Añadir
                  </button>
                </div>
              </div>

              {procesosData.map((p, idx) => (
                <div
                  key={p.id}
                  className="mb-3 border rounded p-3"
                  draggable
                  onDragStart={() => handleDragStartProceso(idx)}
                  onDragOver={(e) => handleDragOverProceso(e, idx)}
                  onDragEnd={handleDragEndProceso}
                >
                  <div className="grid grid-cols-6 gap-2">
                    <input
                      type="text"
                      className="border rounded px-2 py-1"
                      placeholder="Nombre paquete"
                      value={p.nombrePaquete}
                      onChange={(e) => updateProceso(p.id, 'nombrePaquete', e.target.value)}
                    />
                    <input
                      type="text"
                      className="border rounded px-2 py-1 col-span-2"
                      placeholder="Descripción"
                      value={p.descripcion}
                      onChange={(e) => updateProceso(p.id, 'descripcion', e.target.value)}
                    />
                    <input
                      type="text"
                      className="border rounded px-2 py-1"
                      placeholder="Puntuación"
                      value={p.puntuacion}
                      onChange={(e) => updateProceso(p.id, 'puntuacion', e.target.value)}
                    />
                    <input
                      type="date"
                      className="border rounded px-2 py-1"
                      value={p.fechaVisita}
                      onChange={(e) => updateProceso(p.id, 'fechaVisita', e.target.value)}
                    />
                    <input
                      type="text"
                      className="border rounded px-2 py-1"
                      placeholder="Observaciones"
                      value={p.observaciones}
                      onChange={(e) => updateProceso(p.id, 'observaciones', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm">Archivos:</label>
                    <input type="file" multiple onChange={(e) => handleProcesoFileUpload(p.id, e)} />
                  </div>
                  <ul className="list-disc list-inside text-sm">
                    {(p.archivos || []).map((f) => (
                      <li key={f.id} className="flex justify-between items-center">
                        <span>
                          {f.name} ({Math.round(f.size / 1024)} KB)
                        </span>
                        <button className="text-red-600" onClick={() => removeProcesoFile(p.id, f.id)}>
                          Quitar
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-end gap-2 mt-2">
                    <input
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="URL"
                      value={editingProcesoId === p.id ? newProcesoLinkUrl : ''}
                      onChange={(e) => {
                        setEditingProcesoId(p.id);
                        setNewProcesoLinkUrl(e.target.value);
                      }}
                    />
                    <input
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="Título (opcional)"
                      value={editingProcesoId === p.id ? newProcesoLinkTitle : ''}
                      onChange={(e) => {
                        setEditingProcesoId(p.id);
                        setNewProcesoLinkTitle(e.target.value);
                      }}
                    />
                    <button className="px-3 py-1 border rounded" onClick={() => addProcesoLink(p.id)}>
                      Añadir enlace
                    </button>
                  </div>
                  <ul className="list-disc list-inside text-sm">
                    {(p.enlaces || []).map((l) => (
                      <li key={l.id} className="flex justify-between items-center">
                        <a className="text-blue-600 underline" target="_blank" rel="noreferrer" href={l.url}>
                          {l.title}
                        </a>
                        <button className="text-red-600" onClick={() => removeProcesoLink(p.id, l.id)}>
                          Quitar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* Placeholder para otras secciones */}
        {activeSection !== 'centros_exclusivos' && (
          <div className="text-sm text-gray-600 border rounded p-4">
            Sección "{data[activeSection]?.title}" aún sin UI específica. (Pendiente de implementar)
          </div>
        )}
      </main>

      {/* Modal crear/editar Centro */}
      <Modal
        open={showCentroModal}
        onClose={() => setShowCentroModal(false)}
        title={editingCentroId ? 'Editar centro' : 'Nuevo centro'}
        actions={(
          <>
            <button className="px-3 py-1 border rounded" onClick={() => setShowCentroModal(false)}>
              Cancelar
            </button>
            <button
              className="px-3 py-1 bg-red-700 text-white rounded"
              onClick={() => {
                if (!editingCentroNombre.trim()) return alert('El nombre es obligatorio');
                if (centros.length >= MAX_CENTROS && !editingCentroId)
                  return alert(`Máximo ${MAX_CENTROS} centros alcanzado`);

                if (editingCentroId) {
                  // Editar existente
                  setCentros((prev) =>
                    prev.map((c) =>
                      c.id === editingCentroId
                        ? {
                            ...c,
                            nombre: editingCentroNombre,
                            delegado: editingCentroDelegado,
                            audiologo: editingCentroAudiologo,
                            franquiciaSucursal: editingCentroFranquiciaSucursal,
                          }
                        : c
                    )
                  );
                } else {
                  // Crear nuevo
                  const newId = Math.max(0, ...centros.map((c) => c.id)) + 1;
                  setCentros((prev) => [
                    ...prev,
                    {
                      id: newId,
                      nombre: editingCentroNombre,
                      delegado: editingCentroDelegado,
                      audiologo: editingCentroAudiologo,
                      franquiciaSucursal: editingCentroFranquiciaSucursal,
                      color: coloresCentros[newId % coloresCentros.length],
                    },
                  ]);

                  // Inicializa estructura por centro en data
                  setData((prev) => ({
                    ...prev,
                    centros_exclusivos: {
                      ...prev.centros_exclusivos,
                      centrosData: {
                        ...prev.centros_exclusivos.centrosData,
                        [newId]: {
                          customFields: [],
                          accionesResultado: [
                            { id: 1, fecha: '', accion: '', derivacion: 0, cita: 0, observaciones: '' },
                          ],
                          formaciones: Array.from({ length: 10 }, (_, i) => ({
                            id: i + 1, fecha: '', asistencia: '', titulo: '', aplicacion: '',
                          })),
                          procesosPersonalizados: [
                            { id: 1, nombrePaquete: '', descripcion: '', puntuacion: '', observaciones: '', fechaVisita: '', archivos: [], enlaces: [] },
                          ],
                        },
                      },
                    },
                  }));

                  setActiveCentro(newId);
                }

                setShowCentroModal(false);
              }}
            >
              Guardar
            </button>
          </>
        )}
      >
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm col-span-2">
            Nombre
            <input
              className="border rounded px-2 py-1 w-full"
              value={editingCentroNombre}
              onChange={(e) => setEditingCentroNombre(e.target.value)}
            />
          </label>
          <label className="text-sm">
            Delegado
            <input
              className="border rounded px-2 py-1 w-full"
              value={editingCentroDelegado}
              onChange={(e) => setEditingCentroDelegado(e.target.value)}
            />
          </label>
          <label className="text-sm">
            Audiólogo
            <input
              className="border rounded px-2 py-1 w-full"
              value={editingCentroAudiologo}
              onChange={(e) => setEditingCentroAudiologo(e.target.value)}
            />
          </label>
          <label className="text-sm">
            Tipo
            <select
              className="border rounded px-2 py-1 w-full"
              value={editingCentroFranquiciaSucursal}
              onChange={(e) => setEditingCentroFranquiciaSucursal(e.target.value)}
            >
              <option value="Sucursal">Sucursal</option>
              <option value="Franquicia">Franquicia</option>
            </select>
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default AudiologiaApp;

/* ============================
   TESTS (simples, en runtime)
   ============================ */
(() => {
  // Pruebas de reorderList
  const base = [1, 2, 3, 4];
  const r1 = reorderList(base, 0, 2); // [2,3,1,4]
  console.assert(
    JSON.stringify(r1) === JSON.stringify([2, 3, 1, 4]),
    'reorderList: caso básico falló'
  );

  const r2 = reorderList(base, 3, 0); // [4,1,2,3]
  console.assert(
    JSON.stringify(r2) === JSON.stringify([4, 1, 2, 3]),
    'reorderList: mover al inicio falló'
  );

  const r3 = reorderList(base, 1, 1); // sin cambio
  console.assert(
    JSON.stringify(r3) === JSON.stringify([1, 2, 3, 4]),
    'reorderList: índices iguales deben no cambiar'
  );

  const r4 = reorderList([], 0, 1); // lista vacía
  console.assert(
    JSON.stringify(r4) === JSON.stringify([]),
    'reorderList: lista vacía debe quedarse igual'
  );

  // Nuevas pruebas añadidas
  const r5 = reorderList([1, 2, 3], -1, 2); // índices fuera de rango
  console.assert(
    JSON.stringify(r5) === JSON.stringify([1, 2, 3]),
    'reorderList: índices negativos deben ignorarse'
  );

  const arr = [10, 20, 30];
  const r6 = reorderList(arr, 0, 2); // Inmutabilidad de la entrada
  console.assert(
    JSON.stringify(arr) === JSON.stringify([10, 20, 30]),
    'reorderList: no debe mutar el array original'
  );

  const r7 = reorderList([1, 2, 3], 0, 5); // to fuera de rango
  console.assert(
    JSON.stringify(r7) === JSON.stringify([1, 2, 3]),
    'reorderList: índice destino fuera de rango se ignora'
  );
})();