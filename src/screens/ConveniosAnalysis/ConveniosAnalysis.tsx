// @ts-ignore
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Folder,
  ExternalLink,
  PieChart,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  EjecucionConvenio,
  ejecucionConveniosData,
  GestionInterventoria,
  gestionInterventorias,
} from "./ejecucionConveniosData";

interface Convenio {
  id: number;
  oac: string;
  municipio: string;
  convenio: string;
  interventoria: string;
  numeroInterventoria: string;
  radicado: string;
  tipoRadicado: string;
  observaciones: string;
  status:
    | "requiere_alcance"
    | "posible_alcance"
    | "puede_requerir"
    | "no_requiere";
  year: number;
}

interface Stats {
  total: number;
  requiereAlcance: number;
  posibleAlcance: number;
  puedeRequerir: number;
  noRequiere: number;
}

export const ConveniosAnalysis: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<Convenio | null>(null);
  const [selectedEjecucionCard, setSelectedEjecucionCard] =
    useState<EjecucionConvenio | null>(null);

  const [selectedGestionCard, setSelectedGestionCard] =
    useState<GestionInterventoria | null>(null);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const filteredEjecucionConvenios = useMemo(() => {
    return ejecucionConveniosData.filter((convenio) => {
      const matchesSearch =
        searchTerm === "" ||
        convenio.oac.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convenio.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convenio.convenio.includes(searchTerm) ||
        convenio.opcDotacion.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm, ejecucionConveniosData]);

  // Datos completos de todos los convenios del documento
  const convenios: Convenio[] = [
    {
      id: 1,
      oac: "Vereda la Carlota",
      municipio: "Puerto Berrío",
      convenio: "4495-2023",
      interventoria: "Jesús Orlando Vivas",
      numeroInterventoria: "4843",
      radicado: "2024S-VBOG-093243",
      tipoRadicado: "R-EI",
      observaciones:
        "Tiene incorrecto el nombre de la OAC (Esta los nombres de Puerto Perales y Puerto Pita, debería de ser Vereda La Carlota, Vereda La Palestina)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 2,
      oac: "Vereda La Palestina",
      municipio: "Puerto Berrío",
      convenio: "3783-2023",
      interventoria: "Jesús Orlando Vivas",
      numeroInterventoria: "4843",
      radicado: "2024S-VBOG-093243",
      tipoRadicado: "R-EI",
      observaciones:
        "Tiene incorrecto el nombre de la OAC (Esta los nombres de Puerto Perales y Puerto Pita, debería de ser Vereda La Carlota, Vereda La Palestina)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 3,
      oac: "Vereda La Pizarrita",
      municipio: "El Bagre",
      convenio: "3713-2023",
      interventoria: "Interproyectos",
      numeroInterventoria: "5023",
      radicado: "R-EI: 2024S-VBOG-063349 \nR-EC: 2024S-VBOG-088068",
      tipoRadicado: "R-EI y R-EC",
      observaciones:
        'R- EI: Tiene malo el nombre del municipio, dice CAICEDO y es EL BAGRE. \n R- EC: NO REQUIERE ALCANCE, PERO EN EL OFICIO INDICAN "Que, una vez revisado el informe de cierre social, comprendido por el balance de estado social de proyecto, formato MASPS-MN1-IN-3-FR-2, PIS V2, así como por sus formatos concomitantes, entrega de OPC " Y ALLI NO SE HIZO OPC',
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 4,
      oac: "Vereda La Quiebra",
      municipio: "Granada",
      convenio: "3330-2023",
      interventoria: "Interproyectos",
      numeroInterventoria: "5039",
      radicado: "2024S-VBOG-063284",
      tipoRadicado: "R-EI",
      observaciones: "En el párrafo 4 menciona otro número de convenio",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 5,
      oac: "Vereda Santa Gertrudis",
      municipio: "Anorí",
      convenio: "4032-2023",
      interventoria: "Pablo Cesar Murcia",
      numeroInterventoria: "4506",
      radicado: "2024S-VBOG-099732",
      tipoRadicado: "R-EI y R-EC",
      observaciones:
        "REQUIERE ALCANCE (1. El objeto del convenio es incorrecto, menciona otras OAC. \n2. En el párrafo 4 en donde dan CNO mencionan otros números de convenios)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 6,
      oac: "Vereda Chagualo Abajo",
      municipio: "Anorí",
      convenio: "4130-2023",
      interventoria: "Pablo Cesar Murcia",
      numeroInterventoria: "4506",
      radicado: "2024S-VBOG-099732",
      tipoRadicado: "R-EI y R-EC",
      observaciones: "Información incompleta en el documento original",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 7,
      oac: "Corregimiento de Buenos Aires",
      municipio: "Arboletes",
      convenio: "3225-2023",
      interventoria: "Zaida Orjuela",
      numeroInterventoria: "4498",
      radicado: "2024S-VBOG-082014",
      tipoRadicado: "R-EI y R-EC",
      observaciones:
        "REQUIERE ALCANCE (En el oficio no emiten CNO a la entrega de inicio, solo emiten CNO a la de cierre, y de cierre no anexan muchos soportes)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 8,
      oac: "Vereda El Caliche",
      municipio: "Dabeiba",
      convenio: "3553-2023",
      interventoria: "James Kamerer",
      numeroInterventoria: "5062",
      radicado: "R-EI: 2024S-VBOG-044800 \nR-EC: 2024S-VBOG-089161",
      tipoRadicado: "R-EI y R-EC",
      observaciones:
        'EI: PUEDE REQUERIR ALCANCE (Tiene malo el número del convenio en el siguiente párrafo: ". Formato MASPS-MN1-IN-3-FR-5 actualizado con las cotizaciones correspondientes V3 del convenio 3493 de 2023") \nEC: REQUIERE ALCANCE (Tiene mal el nombre de la OAC en el objeto del convenio)',
      status: "puede_requerir",
      year: 2023,
    },
    {
      id: 9,
      oac: "Vereda El Retiro",
      municipio: "Dabeiba",
      convenio: "3502-2023",
      interventoria: "James Alberto Kammerer",
      numeroInterventoria: "5062",
      radicado: "2024S-VBOG-032286",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (No mencionan el nombre de la OAC, numero de convenio y objeto del convenio)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 10,
      oac: "Vereda La Sonadora",
      municipio: "Guatapé",
      convenio: "3229-2023",
      interventoria: "Construmar",
      numeroInterventoria: "4567",
      radicado: "2024S-VBOG-038049",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (ESTA MAL EL NUMERO DEL CONVENIO, tiene el 3329 y es el 3229-2023)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 11,
      oac: "Vereda Guadalito",
      municipio: "El Santuario",
      convenio: "3346-2023",
      interventoria: "Construmar",
      numeroInterventoria: "4567",
      radicado: "2024S-VBOG-038049",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (ESTA MAL EL NUMERO DEL CONVENIO, tiene el 346 y es el 3346-2023)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 12,
      oac: "Vereda Santa Barbara",
      municipio: "Pueblorrico",
      convenio: "3673-2023",
      interventoria: "Constructores H&G 4370",
      numeroInterventoria: "4370",
      radicado: "2024S-VBOG-079763",
      tipoRadicado: "R-EC",
      observaciones:
        "REQUIERE ALCANCE (TIENE MALO EL NUMERO DEL CONVENIO DEL 3673-2023, en el oficio esta el 3663)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 13,
      oac: "Vereda Astilleros",
      municipio: "Valdivia",
      convenio: "3502-2023",
      interventoria: "Construmaj",
      numeroInterventoria: "5066",
      radicado: "2024S-VBOG-054500",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (1. No tiene el número del convenio. \n2. Tiene incorrecto el objeto del convenio, mencionan otra OAC y municipio)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 14,
      oac: "Vereda Correntoso",
      municipio: "Nechí",
      convenio: "4002-2023",
      interventoria: "Construmaj",
      numeroInterventoria: "5066",
      radicado: "2024S-VBOG-059554",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (Tiene incorrecto el número de contrato de interventoría y el número de convenio)",
      status: "requiere_alcance",
      year: 2023,
    },
    {
      id: 15,
      oac: "Corregimiento de Arenas Monas",
      municipio: "San Pedro de Urabá",
      convenio: "3179-2023",
      interventoria: "Leyalí",
      numeroInterventoria: "4420",
      radicado: "2024S-VBOG-056213",
      tipoRadicado: "R-EI",
      observaciones:
        "POSIBLEMENTE REQUIERA DE ALCANCE (En esta entrega la interventoría remite tanto las subsanaciones correspondientes a la entrega inicial como la totalidad de los documentos de la entrega de cierre. \nSin embargo, en la respuesta emitida por SS únicamente se menciona el No Objeción respecto a los formatos de cierre, sin hacer referencia al No objeción de los documentos correspondientes a la Entrega inicial)",
      status: "posible_alcance",
      year: 2023,
    },
    {
      id: 16,
      oac: "Corregimiento Catalina",
      municipio: "San Pedro Urabá",
      convenio: "4420-2023",
      interventoria: "Leyalí",
      numeroInterventoria: "4420",
      radicado: "2024S-VBOG-047193",
      tipoRadicado: "R-EI",
      observaciones:
        "POSIBLEMENTE SE DEBA DE HACER UN ALCANCE (En esta entrega la interventoría remite tanto las subsanaciones correspondientes a la entrega inicial como la totalidad de los documentos de la entrega de cierre. \nSin embargo, en la respuesta emitida por SS únicamente se menciona el No Objeción respecto a los formatos de cierre, sin hacer referencia al No objeción de los documentos correspondientes a la Entrega inicial)",
      status: "posible_alcance",
      year: 2023,
    },
    {
      id: 17,
      oac: "San German",
      municipio: "Carepa",
      convenio: "3220-2023",
      interventoria: "Leyalí",
      numeroInterventoria: "4573",
      radicado: "2024S-VBOG-078672",
      tipoRadicado: "R-EI",
      observaciones:
        "POSIBLEMENTE REQUIERA ALCANCE (En la entrega realizada por la interventoría se incluyen tanto los documentos correspondientes a la Entrega inicial como los de la Entrega de Cierre. \nNo obstante, en la respuesta emitida por SS únicamente emite concepto de No Objeción sobre los formatos de cierre, y se menciona de forma general el concepto de No Objeción a la documentación del convenio, sin especificar claramente si este abarca tanto la entrega inicial como la de cierre)",
      status: "posible_alcance",
      year: 2023,
    },
    {
      id: 18,
      oac: "Vereda La Bonga",
      municipio: "El Bagre",
      convenio: "3316-2023",
      interventoria: "Interproyectos",
      numeroInterventoria: "5023",
      radicado: "2024S-VBOG-088068",
      tipoRadicado: "R-EI",
      observaciones:
        'NO REQUIERE ALCANCE, PERO EN EL OFICIO INDICAN "Que, una vez revisado el informe de cierre social, comprendido por el balance de estado social de proyecto, formato MASPS-MN1-IN-3-FR-2, PIS V2, así como por sus formatos concomitantes, entrega de OPC " Y ALLI NO SE HIZO OPC',
      status: "no_requiere",
      year: 2023,
    },
    {
      id: 19,
      oac: "Vereda San Agustín",
      municipio: "Dabeiba",
      convenio: "3497-2023",
      interventoria: "James Alberto Kammerer",
      numeroInterventoria: "5062",
      radicado: "2024S-VBOG-044799",
      tipoRadicado: "R-EI",
      observaciones:
        'PUEDE REQUERIR ALCANCE (Tiene malo el número del convenio en el siguiente párrafo: "Formato MASPS-MN1-IN-3-FR-5 actualizado con las cotizaciones correspondientes V3 del convenio 3493 de 2023")',
      status: "puede_requerir",
      year: 2023,
    },
    {
      id: 20,
      oac: "Vereda Caucheras",
      municipio: "Mutatá",
      convenio: "2706-2024",
      interventoria: "Consorcio Yiwu",
      numeroInterventoria: "3563",
      radicado: "2025S-VBOG-003836",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (Esta incorrecto el número del convenio, en el oficio está el número 2766 y es el 2706)",
      status: "requiere_alcance",
      year: 2024,
    },
    {
      id: 21,
      oac: "El Totumo",
      municipio: "Necoclí",
      convenio: "2591-2024",
      interventoria: "Consorcio Yiwu",
      numeroInterventoria: "3563",
      radicado: "2025S-VBOG-004340",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (tiene el No. convenio incorrecto, EN EL OFICIO ETA EL NUMERO 2951 y es el 2591)",
      status: "requiere_alcance",
      year: 2024,
    },
    {
      id: 22,
      oac: "Bocas de Iguana",
      municipio: "Necoclí",
      convenio: "2553-2024",
      interventoria: "Consorcio Yiwu",
      numeroInterventoria: "3563",
      radicado: "2025S-VBOG-009811",
      tipoRadicado: "R-EI (PIS V.3)",
      observaciones:
        "REQUIERE ALCANCE (En la respuesta de SS tiene el No. convenio incorrecto, en el oficio está el número 2353 y es el 2553. Además, dicen que dan CNO de PIS V1 y se envió V.3)",
      status: "requiere_alcance",
      year: 2024,
    },
    {
      id: 23,
      oac: "Vereda Montecristo",
      municipio: "San Juan de Urabá",
      convenio: "2310-2024",
      interventoria: "Consorcio YIWU",
      numeroInterventoria: "3563",
      radicado: "2025S-VBOG-003839",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (TIENE EL OBJETO DE CONVENIO MALO, MENCIONA LA OAC CAUCHERAS)",
      status: "requiere_alcance",
      year: 2024,
    },
    {
      id: 24,
      oac: "Vereda Entrasipuedes",
      municipio: "San Juan de Urabá",
      convenio: "2448-2024",
      interventoria: "Consorcio Yiwu",
      numeroInterventoria: "3563",
      radicado: "2025S-VBOG-003837",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (En la primera entrega en los soportes del PIS tienen malo el nombre de la junta. En la respuesta de SS tiene el No. convenio y el nombre de la JAC incorrecto, en el oficio está el nombre de la OAC Caucheras y debe de ser la de ENTRASIPUEDES). \nEn la respuesta de SS del PIS V.3 no especifican nombre de la JAC ni No. de convenio)",
      status: "requiere_alcance",
      year: 2024,
    },
    {
      id: 25,
      oac: "Vereda Biogui",
      municipio: "Toledo",
      convenio: "2405-2024",
      interventoria: "Consorcio Yiwu",
      numeroInterventoria: "3563",
      radicado: "2024S-VBOG-096894",
      tipoRadicado: "R-EI",
      observaciones:
        "REQUIERE ALCANCE (TIENE EL NUMERO DE CONVENIO INCORRECTO EN EL PARRAFO 2 EN EL ULTIMO RENGLÓN ESTA EL 4755 Y ES EL 2405)",
      status: "requiere_alcance",
      year: 2024,
    },
  ];

  // Filtrar convenios según criterios
  const filteredConvenios = useMemo(() => {
    return convenios.filter((convenio) => {
      const matchesStatus =
        selectedFilter === "all" || convenio.status === selectedFilter;
      const matchesYear =
        selectedYear === "all" || convenio.year.toString() === selectedYear;
      const matchesSearch =
        searchTerm === "" ||
        convenio.oac.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convenio.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        convenio.convenio.includes(searchTerm) ||
        convenio.interventoria.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesYear && matchesSearch;
    });
  }, [selectedFilter, selectedYear, searchTerm]);

  // Estadísticas de filtros
  const stats: Stats = useMemo(() => {
    const total = filteredConvenios.length;
    const requiereAlcance = filteredConvenios.filter(
      (c) => c.status === "requiere_alcance"
    ).length;
    const posibleAlcance = filteredConvenios.filter(
      (c) => c.status === "posible_alcance"
    ).length;
    const puedeRequerir = filteredConvenios.filter(
      (c) => c.status === "puede_requerir"
    ).length;
    const noRequiere = filteredConvenios.filter(
      (c) => c.status === "no_requiere"
    ).length;

    return {
      total,
      requiereAlcance,
      posibleAlcance,
      puedeRequerir,
      noRequiere,
    };
  }, [filteredConvenios]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "requiere_alcance":
        return "#dc2626";
      case "posible_alcance":
        return "#d97706";
      case "puede_requerir":
        return "#ea580c";
      case "no_requiere":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "requiere_alcance":
        return "Requiere Alcance";
      case "posible_alcance":
        return "Posible Alcance";
      case "puede_requerir":
        return "Puede Requerir";
      case "no_requiere":
        return "No Requiere";
      default:
        return "Sin Estado";
    }
  };

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status) {
      case "requiere_alcance":
        return <AlertTriangle size={16} />;
      case "posible_alcance":
        return <Clock size={16} />;
      case "puede_requerir":
        return <FileText size={16} />;
      case "no_requiere":
        return <CheckCircle size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  };

  const clearFilter = (filterType: "search" | "status" | "year"): void => {
    switch (filterType) {
      case "search":
        setSearchTerm("");
        break;
      case "status":
        setSelectedFilter("all");
        break;
      case "year":
        setSelectedYear("all");
        break;
    }
  };

  const clearAllFilters = (): void => {
    setSearchTerm("");
    setSelectedFilter("all");
    setSelectedYear("all");
  };


  const containerStyle: React.CSSProperties = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: "linear-gradient(135deg, #ffd9b2 0%, #ffd9b2 100%)",
    backgroundImage: "url('/INVÍAS_Colombia_logo.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "100%  100%",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "24px",
    color: "#374151",
    position: "relative",
  };


  const maxWidthStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "32px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    color: "#6b7280",
  };

  const subtitleSmallStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: "#9ca3af",
    marginTop: "4px",
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "32px",
  };

  const filtersContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const searchContainerStyle: React.CSSProperties = {
    flex: 1,
    position: "relative",
  };

  const searchInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 12px 12px 40px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
  };

  const searchIconStyle: React.CSSProperties = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
  };

  const filtersGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
  };

  const filterSelectStyle: React.CSSProperties = {
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "white",
    fontSize: "14px",
    cursor: "pointer",
    outline: "none",
    transition: "all 0.2s",
  };

  const activeFiltersStyle: React.CSSProperties = {
    marginTop: "16px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  };

  const filterTagStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    gap: "4px",
  };

  const statsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  };

  const statCardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    textAlign: "center",
  };

  const statNumberStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "4px",
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: "#6b7280",
  };

  const resultsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  };

  const convenioCardStyle: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    background: "white",
    transition: "all 0.2s",
    cursor: "pointer",
  };

  const convenioHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  };

  const convenioTitleStyle: React.CSSProperties = {
    fontWeight: "600",
    color: "#1f2937",
    fontSize: "0.875rem",
    marginBottom: "4px",
  };

  const convenioLocationStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#6b7280",
    fontSize: "0.75rem",
  };

  const statusDotStyle: React.CSSProperties = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  };

  const convenioDetailsStyle: React.CSSProperties = {
    marginBottom: "12px",
  };

  const detailRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    marginBottom: "2px",
  };

  const detailLabelStyle: React.CSSProperties = {
    color: "#6b7280",
  };

  const detailValueStyle: React.CSSProperties = {
    fontWeight: "500",
  };

  const statusBadgeStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "white",
  };

  const noResultsStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "48px",
    color: "#6b7280",
    gridColumn: "1 / -1",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "24px",
  };

  const sectionSubtitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: "400",
    color: "#1f2937",
    marginBottom: "18px",
  };

  // Función para categorizar los convenios por tipo de inversión
  const categorizarInversion = useMemo(() => {
    const categorias = {
      OPC: 0,
      Dotación: 0,
      Socialización: 0,
      "OPC + Dotación": 0,
    };

    ejecucionConveniosData.forEach((convenio) => {
      const descripcion = convenio.opcDotacion.toLowerCase();

      if (descripcion.includes("opc") && descripcion.includes("dotación")) {
        categorias["OPC + Dotación"] += convenio.valorEjecutado;
      } else if (descripcion.includes("opc")) {
        categorias["OPC"] += convenio.valorEjecutado;
      } else if (descripcion.includes("dotación")) {
        categorias["Dotación"] += convenio.valorEjecutado;
      } else if (descripcion.includes("socialización")) {
        categorias["Socialización"] += convenio.valorEjecutado;
      } else {
        // Si no se puede categorizar claramente, se considera socialización
        categorias["Socialización"] += convenio.valorEjecutado;
      }
    });

    return Object.entries(categorias)
      .filter(([_, valor]) => valor > 0)
      .map(([nombre, valor]) => ({
        name: nombre,
        value: valor,
        porcentaje: (
          (valor /
            ejecucionConveniosData.reduce(
              (sum, c) => sum + c.valorEjecutado,
              0
            )) *
          100
        ).toFixed(1),
      }));
  }, [ejecucionConveniosData]);

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "12px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", color: "#1f2937" }}>
            {data.payload.name}
          </p>
          <p
            style={{ margin: "4px 0 0 0", color: "#059669", fontWeight: "600" }}
          >
            {formatCurrency(data.value)}
          </p>
          <p
            style={{
              margin: "2px 0 0 0",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            {data.payload.porcentaje}% del total
          </p>
        </div>
      );
    }
    return null;
  };

  // Colores para la gráfica de torta
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  // Filtrar gestión de interventorías
  const filteredGestionInterventorias = useMemo(() => {
    return gestionInterventorias.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.oac.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.convenio.includes(searchTerm) ||
        item.interventoria.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const getEntregaStatusColor = (entrega: string): string => {
    if (entrega.includes("EI y EC")) return "#dc2626"; // Rojo - ambas faltantes
    if (entrega.includes("EC")) return "#f59e0b"; // Naranja - solo cierre
    if (entrega.includes("EI")) return "#3b82f6"; // Azul - solo inicio
    return "#6b7280"; // Gris - sin especificar
  };

  const getEntregaStatusText = (entrega: string): string => {
    if (entrega.includes("EI y EC")) return "Falta Inicio y Cierre";
    if (entrega.includes("EC")) return "Falta Cierre";
    if (entrega.includes("EI")) return "Falta Inicio";
    return "Sin especificar";
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            Informe Social Primer semestre convenios 2023-2024{" "}
          </h1>
          <p style={subtitleStyle}>DT ANTIOQUIA</p>
          <p style={subtitleSmallStyle}>
            Total de convenios en base de datos: {convenios.length}
          </p>
        </div>

        {/* Filtros */}
        <div style={cardStyle}>
          <div style={filtersContainerStyle}>
            <div style={searchContainerStyle}>
              <Search style={searchIconStyle} size={20} />
              <input
                type="text"
                style={searchInputStyle}
                placeholder="Buscar por OAC, municipio, convenio o interventoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={filtersGroupStyle}>
              <select
                style={filterSelectStyle}
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="requiere_alcance">Requiere Alcance</option>
                <option value="posible_alcance">Posible Alcance</option>
                <option value="puede_requerir">Puede Requerir</option>
                <option value="no_requiere">No Requiere</option>
              </select>

              <select
                style={filterSelectStyle}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="all">Todos los años</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>

          {/* Filtros activos */}
          <div style={activeFiltersStyle}>
            {searchTerm && (
              <div
                style={{
                  ...filterTagStyle,
                  background: "#dbeafe",
                  color: "#1e40af",
                }}
              >
                <Search size={12} />
                Búsqueda: "{searchTerm}"
                <button
                  onClick={() => clearFilter("search")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    marginLeft: "4px",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {selectedFilter !== "all" && (
              <div
                style={{
                  ...filterTagStyle,
                  background: "#dcfce7",
                  color: "#166534",
                }}
              >
                <Filter size={12} />
                Estado: {getStatusText(selectedFilter)}
                <button
                  onClick={() => clearFilter("status")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    marginLeft: "4px",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {selectedYear !== "all" && (
              <div
                style={{
                  ...filterTagStyle,
                  background: "#f3e8ff",
                  color: "#7c3aed",
                }}
              >
                Año: {selectedYear}
                <button
                  onClick={() => clearFilter("year")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    cursor: "pointer",
                    marginLeft: "4px",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {(searchTerm ||
              selectedFilter !== "all" ||
              selectedYear !== "all") && (
              <button
                onClick={clearAllFilters}
                style={{
                  ...filterTagStyle,
                  background: "#f3f4f6",
                  color: "#374151",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Limpiar todos
              </button>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        {/* <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: "#374151" }}>
              {stats.total}
            </div>
            <div style={statLabelStyle}>Total</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: "#dc2626" }}>
              {stats.requiereAlcance}
            </div>
            <div style={statLabelStyle}>Requiere</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: "#d97706" }}>
              {stats.posibleAlcance}
            </div>
            <div style={statLabelStyle}>Posible</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: "#ea580c" }}>
              {stats.puedeRequerir}
            </div>
            <div style={statLabelStyle}>Puede Req.</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: "#16a34a" }}>
              {stats.noRequiere}
            </div>
            <div style={statLabelStyle}>No Requiere</div>
          </div>
        </div> */}

        {/* Resultados */}
        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>
            1. Matriz de seguimiento - convenios 2023 ({stats.total} convenios)
          </h3>

          <h5 style={sectionSubtitleStyle}>
            1.1 Oficio con CNO de Inicio y Cierre
          </h5>
          {filteredConvenios.length === 0 ? (
            <div style={noResultsStyle}>
              <Search
                size={48}
                style={{ margin: "0 auto 16px", color: "#d1d5db" }}
              />
              <h3 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>
                No se encontraron convenios
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                Intenta ajustar los criterios de búsqueda
              </p>
            </div>
          ) : (
            <div style={resultsGridStyle}>
              {filteredConvenios.map((convenio) => (
                <div
                  key={convenio.id}
                  style={convenioCardStyle}
                  onClick={() => setSelectedCard(convenio)}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                    target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    target.style.transform = "translateY(0)";
                  }}
                >
                  <div style={convenioHeaderStyle}>
                    <div style={{ flex: 1 }}>
                      <div style={convenioTitleStyle}>{convenio.oac}</div>
                      <div style={convenioLocationStyle}>
                        <MapPin size={12} />
                        <span>{convenio.municipio}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        ...statusDotStyle,
                        backgroundColor: getStatusColor(convenio.status),
                      }}
                    ></div>
                  </div>

                  <div style={convenioDetailsStyle}>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Convenio:</span>
                      <span style={detailValueStyle}>{convenio.convenio}</span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Año:</span>
                      <span style={detailValueStyle}>{convenio.year}</span>
                    </div>
                    {convenio.interventoria && (
                      <div style={detailRowStyle}>
                        <span style={detailLabelStyle}>Interventoría:</span>
                        <span
                          style={{
                            ...detailValueStyle,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginLeft: "8px",
                          }}
                        >
                          {convenio.interventoria}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      ...statusBadgeStyle,
                      backgroundColor: getStatusColor(convenio.status),
                    }}
                  >
                    {getStatusIcon(convenio.status)}
                    <span>{getStatusText(convenio.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resultados de convenios con CNO de Inicio y Cierre */}
        <div style={cardStyle}>
          <h5 style={sectionSubtitleStyle}>
            1.2 Ejecución Recurso socioambiental - Convenios 2023 (
            {filteredEjecucionConvenios.length} convenios)
          </h5>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              padding: "12px 16px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: "0.875rem", color: "#475569" }}>
              <strong>Total ejecutado:</strong>{" "}
              {formatCurrency(
                filteredEjecucionConvenios.reduce(
                  (sum, c) => sum + c.valorEjecutado,
                  0
                )
              )}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#475569" }}>
              <strong>Municipios:</strong>{" "}
              {
                Array.from(
                  new Set(filteredEjecucionConvenios.map((c) => c.municipio))
                ).length
              }
            </div>
          </div>

          {filteredEjecucionConvenios.length === 0 ? (
            <div style={noResultsStyle}>
              <Search
                size={48}
                style={{ margin: "0 auto 16px", color: "#d1d5db" }}
              />
              <h3 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>
                No se encontraron convenios de ejecución
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                Intenta ajustar los criterios de búsqueda
              </p>
            </div>
          ) : (
            <div style={resultsGridStyle}>
              {filteredEjecucionConvenios.map((convenio) => (
                <div
                  key={`ejecucion-${convenio.id}`}
                  style={convenioCardStyle}
                  onClick={() => setSelectedEjecucionCard(convenio)}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                    target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    target.style.transform = "translateY(0)";
                  }}
                >
                  <div style={convenioHeaderStyle}>
                    <div style={{ flex: 1 }}>
                      <div style={convenioTitleStyle}>{convenio.oac}</div>
                      <div style={convenioLocationStyle}>
                        <MapPin size={12} />
                        <span>{convenio.municipio}</span>
                      </div>
                    </div>
                    {convenio.linkCarpetas && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(convenio.linkCarpetas, "_blank");
                        }}
                        style={{
                          background: "#3b82f6",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px",
                          color: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.backgroundColor = "#2563eb";
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.backgroundColor = "#3b82f6";
                        }}
                      >
                        <Folder size={14} />
                        <ExternalLink size={12} />
                      </button>
                    )}
                  </div>

                  <div style={convenioDetailsStyle}>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Convenio:</span>
                      <span style={detailValueStyle}>{convenio.convenio}</span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Valor ejecutado:</span>
                      <span
                        style={{
                          ...detailValueStyle,
                          color: "#059669",
                          fontWeight: "600",
                        }}
                      >
                        {formatCurrency(convenio.valorEjecutado)}
                      </span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>OPC/Dotación:</span>
                      <span
                        style={{
                          ...detailValueStyle,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "180px",
                        }}
                      >
                        {convenio.opcDotacion}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor: "#dcfdf4",
                      color: "#059669",
                    }}
                  >
                    <CheckCircle size={12} />
                    <span>Ejecutado</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Gráfica de distribución de inversión */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              <PieChart size={20} style={{ color: "#3b82f6" }} />
              <h6
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: 0,
                }}
              >
                Distribución de Inversión por Tipo de Actividad
              </h6>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 300px",
                gap: "24px",
                alignItems: "center",
              }}
            >
              <div style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categorizarInversion}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, porcentaje }) =>
                        `${name}: ${porcentaje}%`
                      }
                    >
                      {categorizarInversion.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h6
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "12px",
                  }}
                >
                  Resumen por Categoría
                </h6>
                {categorizarInversion.map((categoria, index) => (
                  <div
                    key={categoria.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom:
                        index < categorizarInversion.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "2px",
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span style={{ fontSize: "0.875rem", color: "#374151" }}>
                        {categoria.name}
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {formatCurrency(categoria.value)}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                        {categoria.porcentaje}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gestión interventorías pendientes de enviar entrega de cierre social */}
        <div style={cardStyle}>
          <h5 style={sectionSubtitleStyle}>
            1.3 Gestión con interventorías pendientes de enviar entrega de
            cierre social ({filteredGestionInterventorias.length} convenios)
          </h5>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              padding: "12px 16px",
              backgroundColor: "#fef3c7",
              borderRadius: "8px",
              border: "1px solid #f59e0b",
            }}
          >
            <div style={{ fontSize: "0.875rem", color: "#92400e" }}>
              <strong>⚠️ Convenios pendientes:</strong>{" "}
              {filteredGestionInterventorias.length}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#92400e" }}>
              <strong>Interventorías:</strong>{" "}
              {
                Array.from(
                  new Set(
                    filteredGestionInterventorias.map((c) => c.interventoria)
                  )
                ).length
              }
            </div>
          </div>

          {filteredGestionInterventorias.length === 0 ? (
            <div style={noResultsStyle}>
              <AlertTriangle
                size={48}
                style={{ margin: "0 auto 16px", color: "#f59e0b" }}
              />
              <h3 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>
                No se encontraron convenios pendientes
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                Intenta ajustar los criterios de búsqueda
              </p>
            </div>
          ) : (
            <div style={resultsGridStyle}>
              {filteredGestionInterventorias.map((item) => (
                <div
                  key={`gestion-${item.id}`}
                  style={{
                    ...convenioCardStyle,
                    borderColor: "#f59e0b",
                    backgroundColor: "#fffbeb",
                  }}
                  onClick={() => setSelectedGestionCard(item)}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.boxShadow =
                      "0 4px 12px rgba(245, 158, 11, 0.2)";
                    target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    target.style.transform = "translateY(0)";
                  }}
                >
                  <div style={convenioHeaderStyle}>
                    <div style={{ flex: 1 }}>
                      <div style={convenioTitleStyle}>{item.oac}</div>
                      <div style={convenioLocationStyle}>
                        <MapPin size={12} />
                        <span>{item.municipio}</span>
                      </div>
                    </div>
                    {item.linkCarpeta && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.linkCarpeta, "_blank");
                        }}
                        style={{
                          background: "#f59e0b",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px",
                          color: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.backgroundColor = "#d97706";
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.backgroundColor = "#f59e0b";
                        }}
                        title="Abrir carpeta de gestión"
                      >
                        <Folder size={14} />
                        <ExternalLink size={12} />
                      </button>
                    )}
                  </div>

                  <div style={convenioDetailsStyle}>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Convenio:</span>
                      <span style={detailValueStyle}>{item.convenio}</span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>Interventoría:</span>
                      <span
                        style={{
                          ...detailValueStyle,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "150px",
                        }}
                      >
                        {item.interventoria}
                      </span>
                    </div>
                    <div style={detailRowStyle}>
                      <span style={detailLabelStyle}>No. Contrato:</span>
                      <span style={detailValueStyle}>
                        {item.numeroContrato}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor: getEntregaStatusColor(
                        item.entregaFaltante
                      ),
                      color: "white",
                    }}
                  >
                    <AlertTriangle size={12} />
                    <span>{getEntregaStatusText(item.entregaFaltante)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Gestión interventorías pendientes de enviar entrega de cierre social */}

        <div style={cardStyle}>
          <h3 style={sectionTitleStyle}>4. CAPACITACIONES</h3>

          <h5 style={sectionSubtitleStyle}>
            Según lo identificado por las Juntas de Acción Comunal, la
            comunidad, el personal de la OAC y de interventoría, se sugiere,
            desde la Dirección Territorial Antioquia, impartir capacitaciones
            tanto al personal del contrato de obra como al equipo de
            interventoría. Estas jornadas formativas deberán abordar aspectos
            contables, ambientales, técnicos y de Seguridad y Salud en el
            Trabajo, con especial énfasis en los temas contables y ambientales.
            Aunque actualmente el contrato de interventoría para los convenios
            de vigencia 2024 se encuentra suspendido, se recomienda que, al
            reanudarse dicho contrato, se inicie de inmediato este proceso de
            capacitación
          </h5>

          {/* Datos de capacitaciones */}
          {(() => {
            const capacitacionesData = [
              {
                municipio: "APARTADO",
                capacitacionGeneral: [
                  { oac: "OAC LA MIRANDA", convenio: "4039-2024" },
                ],
                liquidacion: [{ oac: "OAC SAN MIGUEL", convenio: "2689-2024" }],
              },
              {
                municipio: "CHIGORODÓ",
                capacitacionGeneral: [
                  { oac: "OAC GUAPAS LAS MERCEDES", convenio: "2674-2024" },
                ],
                liquidacion: [
                  { oac: "OAC LAS GUAGUAS", convenio: "2633-2024" },
                ],
              },
              {
                municipio: "SAN PEDRO DE URABÁ",
                capacitacionGeneral: [
                  { oac: "OAC ZAPINDONGA ARRIBA", convenio: "2258-2024" },
                ],
                liquidacion: [
                  { oac: "OAC EL AJI", convenio: "2457-2024" },
                  { oac: "OAC EL TOMATE", convenio: "2439-2024" },
                ],
              },
              {
                municipio: "TURBO",
                capacitacionGeneral: [
                  { oac: "COMUNIDAD INDIGENA EL MANGO", convenio: "2273-2024" },
                ],
                liquidacion: [
                  { oac: "OAC CORREGIMIENTO EL DOS", convenio: "2538-2024" },
                  { oac: "OAC NUEVA COLOMBIA", convenio: "2531-2024" },
                ],
              },
              {
                municipio: "SANTA FE DE ANTIOQUIA",
                capacitacionGeneral: [
                  { oac: "OAC EL PESCADO", convenio: "3538-2024" },
                  { oac: "OAC PEDREGAL", convenio: "3778-2024" },
                  { oac: "OAC MORADITAS", convenio: "3574-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "COCORNA",
                capacitacionGeneral: [
                  { oac: "OAC SANTA BARBARA", convenio: "3746-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "SAN LUIS",
                capacitacionGeneral: [
                  { oac: "OAC BUENOS AIRES", convenio: "3765-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "SONSÓN",
                capacitacionGeneral: [
                  { oac: "OAC ALTO DE SABANAS", convenio: "3582-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "CAUCASIA",
                capacitacionGeneral: [
                  { oac: "OAC URBANIZACIÓN EL OASIS", convenio: "2341-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "GRANADA",
                capacitacionGeneral: [
                  { oac: "OAC LOS MEDIOS", convenio: "3521-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "SAN CARLOS",
                capacitacionGeneral: [
                  { oac: "OAC LA VILLA", convenio: "3626-2024" },
                  { oac: "OAC LA HONDITA", convenio: "3782-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "URRAO",
                capacitacionGeneral: [
                  { oac: "OAC EL TUNAL", convenio: "2273-2024" },
                ],
                liquidacion: [
                  { oac: "LA MATANZA", convenio: "2181-2024" },
                  { oac: "LA QUIEBRA", convenio: "2759-2024" },
                ],
              },
              {
                municipio: "DABEIBA",
                capacitacionGeneral: [
                  { oac: "OAC CALICHE CAMPARRUSIA", convenio: "4392-2024" },
                  { oac: "OAC LA BALSITA", convenio: "4394-2024" },
                  { oac: "OAC EL BALSO", convenio: "4366-2024" },
                  { oac: "OAC LLANOGRANDE", convenio: "4393-2024" },
                ],
                liquidacion: [
                  { oac: "OAC LOS NARANJOS", convenio: "2104-2024" },
                ],
              },
              {
                municipio: "VIGÍA DEL FUERTE",
                capacitacionGeneral: [
                  { oac: "OAC SAN MIGUEL", convenio: "4029-2024" },
                  { oac: "OAC VILLA NUEVA", convenio: "4074-2024" },
                  {
                    oac: "RESGUARDO INGIDENA EL SALADO",
                    convenio: "4219-2024",
                  },
                  {
                    oac: "RESGUARDO INDIGENA GUAGUANDO",
                    convenio: "4216-2024",
                  },
                  { oac: "RESGUARDO INDIGENA JARAPETÓ", convenio: "4196-2024" },
                ],
                liquidacion: [],
              },
              {
                municipio: "MUTATÁ",
                capacitacionGeneral: [
                  { oac: "OAC CHADO ARRIBA", convenio: "2742-2024" },
                ],
                liquidacion: [{ oac: "OAC CAUCHERAS", convenio: "2706-2024" }],
              },
              {
                municipio: "ARBOLETES",
                capacitacionGeneral: [],
                liquidacion: [
                  { oac: "OAC LA VEJEZ", convenio: "2331-2024" },
                  { oac: "OAC LAS NARANJITAS", convenio: "2348-2024" },
                  { oac: "OAC GUADUAL ABAJO", convenio: "2580-2024" },
                ],
              },
              {
                municipio: "CÁCERES",
                capacitacionGeneral: [],
                liquidacion: [{ oac: "OAC NICARAGUA", convenio: "2409-2025" }],
              },
              {
                municipio: "CAREPA",
                capacitacionGeneral: [],
                liquidacion: [
                  { oac: "OAC LA ESMERALDA", convenio: "2319-2024" },
                  { oac: "OAC LAS FLORES", convenio: "3041-2024" },
                  { oac: "OAC EL SILENCIO", convenio: "2377-2024" },
                ],
              },
              {
                municipio: "EL BAGRE",
                capacitacionGeneral: [],
                liquidacion: [
                  { oac: "OAC VILLA CHICA ABAJO", convenio: "2404-2024" },
                ],
              },
              {
                municipio: "NECOCLÍ",
                capacitacionGeneral: [],
                liquidacion: [
                  { oac: "OAC EL TOTUMO", convenio: "2591-2024" },
                  { oac: "OAC VILLA ISABEL", convenio: "2587-2024" },
                  { oac: "OAC BOCAS DE IGUANA", convenio: "2553-2024" },
                ],
              },
              {
                municipio: "SAN FRANCISCO",
                capacitacionGeneral: [],
                liquidacion: [
                  { oac: "OAC LA MARAVILLA", convenio: "2128-2024" },
                ],
              },
              {
                municipio: "SAN JUAN DE  URABÁ",
                capacitacionGeneral: [],
                liquidacion: [
                  { oac: "OAC  MONTECRISTO", convenio: "2310-2024" },
                  { oac: "OAC UVEROS", convenio: "2443-2024" },
                  { oac: "OAC ENTRASIPUEDES", convenio: "2448-2024" },
                ],
              },
              {
                municipio: "TOLEDO",
                capacitacionGeneral: [],
                liquidacion: [{ oac: "OAC BIOGUI", convenio: "2405-2024" }],
              },
              {
                municipio: "URAMITA",
                capacitacionGeneral: [],
                liquidacion: [{ oac: "OAC EL MADERO", convenio: "2313-2024" }],
              },
            ];

            return (
              <div>
                {/* Resumen de capacitaciones */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      ...statCardStyle,
                      backgroundColor: "#dbeafe",
                      border: "1px solid #3b82f6",
                    }}
                  >
                    <div style={{ ...statNumberStyle, color: "#1d4ed8" }}>
                      {capacitacionesData.reduce(
                        (sum, m) => sum + m.capacitacionGeneral.length,
                        0
                      )}
                    </div>
                    <div style={statLabelStyle}>Capacitación General</div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: "4px",
                      }}
                    >
                      Contables, SST, Ambientales, Técnicos
                    </div>
                  </div>
                  <div
                    style={{
                      ...statCardStyle,
                      backgroundColor: "#dcfdf4",
                      border: "1px solid #10b981",
                    }}
                  >
                    <div style={{ ...statNumberStyle, color: "#047857" }}>
                      {capacitacionesData.reduce(
                        (sum, m) => sum + m.liquidacion.length,
                        0
                      )}
                    </div>
                    <div style={statLabelStyle}>Liquidación de Convenios</div>
                  </div>
                </div>

                {/* Cards por municipio */}
                <div style={resultsGridStyle}>
                  {capacitacionesData.map((municipioData, index) => (
                    <div
                      key={`capacitacion-${index}`}
                      style={{
                        ...convenioCardStyle,
                        borderColor: "#e5e7eb",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <MapPin size={16} style={{ color: "#3b82f6" }} />
                          <h6
                            style={{
                              fontSize: "1rem",
                              fontWeight: "600",
                              color: "#1f2937",
                              margin: 0,
                            }}
                          >
                            {municipioData.municipio}
                          </h6>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {municipioData.capacitacionGeneral.length +
                            municipioData.liquidacion.length}{" "}
                          OAC total
                        </div>
                      </div>

                      {/* Capacitación General */}
                      {municipioData.capacitacionGeneral.length > 0 && (
                        <div style={{ marginBottom: "16px" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#3b82f6",
                              }}
                            ></div>
                            <span
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "#1f2937",
                              }}
                            >
                              Capacitación General (
                              {municipioData.capacitacionGeneral.length})
                            </span>
                          </div>
                          <div style={{ paddingLeft: "14px" }}>
                            {municipioData.capacitacionGeneral.map(
                              (item, idx) => (
                                <div
                                  key={`general-${idx}`}
                                  style={{
                                    fontSize: "0.75rem",
                                    marginBottom: "4px",
                                    color: "#374151",
                                  }}
                                >
                                  <div style={{ fontWeight: "500" }}>
                                    {item.oac}
                                  </div>
                                  <div style={{ color: "#6b7280" }}>
                                    Convenio: {item.convenio}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Liquidación */}
                      {municipioData.liquidacion.length > 0 && (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              marginBottom: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#10b981",
                              }}
                            ></div>
                            <span
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "#1f2937",
                              }}
                            >
                              Liquidación ({municipioData.liquidacion.length})
                            </span>
                          </div>
                          <div style={{ paddingLeft: "14px" }}>
                            {municipioData.liquidacion.map((item, idx) => (
                              <div
                                key={`liquidacion-${idx}`}
                                style={{
                                  fontSize: "0.75rem",
                                  marginBottom: "4px",
                                  color: "#374151",
                                }}
                              >
                                <div style={{ fontWeight: "500" }}>
                                  {item.oac}
                                </div>
                                <div style={{ color: "#6b7280" }}>
                                  Convenio: {item.convenio}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Si no tiene ningún tipo de capacitación */}
                      {municipioData.capacitacionGeneral.length === 0 &&
                        municipioData.liquidacion.length === 0 && (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "16px",
                              color: "#9ca3af",
                              fontSize: "0.875rem",
                              fontStyle: "italic",
                            }}
                          >
                            Sin capacitaciones programadas
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Modal de Detalles para Ejecución */}
        {selectedEjecucionCard && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {selectedEjecucionCard.oac}
                    </h2>
                    <p style={{ color: "#6b7280" }}>
                      {selectedEjecucionCard.municipio}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEjecucionCard(null)}
                    style={{
                      color: "#6b7280",
                      fontSize: "1.5rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Número de Convenio
                      </p>
                      <p style={{ fontWeight: "500", fontSize: "1.125rem" }}>
                        {selectedEjecucionCard.convenio}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Valor Ejecutado
                      </p>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "1.25rem",
                          color: "#059669",
                        }}
                      >
                        {formatCurrency(selectedEjecucionCard.valorEjecutado)}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Link a Carpetas
                      </p>
                      {selectedEjecucionCard.linkCarpetas ? (
                        <button
                          onClick={() =>
                            window.open(
                              selectedEjecucionCard.linkCarpetas,
                              "_blank"
                            )
                          }
                          style={{
                            background: "#3b82f6",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginTop: "4px",
                          }}
                        >
                          <Folder size={16} />
                          <span>Abrir carpeta</span>
                          <ExternalLink size={14} />
                        </button>
                      ) : (
                        <p style={{ color: "#9ca3af", fontStyle: "italic" }}>
                          No disponible
                        </p>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Estado
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          backgroundColor: "#dcfdf4",
                          color: "#059669",
                          width: "fit-content",
                          marginTop: "4px",
                        }}
                      >
                        <CheckCircle size={16} />
                        <span>Ejecutado</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    OPC/Dotación/Socializaciones
                  </p>
                  <div
                    style={{
                      padding: "16px",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <p style={{ fontWeight: "500", lineHeight: "1.6" }}>
                      {selectedEjecucionCard.opcDotacion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalles para Gestión */}
        {selectedGestionCard && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {selectedGestionCard.oac}
                    </h2>
                    <p style={{ color: "#6b7280" }}>
                      {selectedGestionCard.municipio}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedGestionCard(null)}
                    style={{
                      color: "#6b7280",
                      fontSize: "1.5rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Número de Convenio
                      </p>
                      <p style={{ fontWeight: "500", fontSize: "1.125rem" }}>
                        {selectedGestionCard.convenio}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Interventoría
                      </p>
                      <p style={{ fontWeight: "500" }}>
                        {selectedGestionCard.interventoria}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        No. Contrato
                      </p>
                      <p style={{ fontWeight: "500" }}>
                        {selectedGestionCard.numeroContrato}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Entrega Faltante
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          backgroundColor: getEntregaStatusColor(
                            selectedGestionCard.entregaFaltante
                          ),
                          color: "white",
                          width: "fit-content",
                          marginTop: "4px",
                        }}
                      >
                        <AlertTriangle size={16} />
                        <span>
                          {getEntregaStatusText(
                            selectedGestionCard.entregaFaltante
                          )}
                        </span>
                      </div>
                    </div>
                    {selectedGestionCard.linkCarpeta && (
                      <div>
                        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                          Carpeta de Gestión
                        </p>
                        <button
                          onClick={() =>
                            window.open(
                              selectedGestionCard.linkCarpeta,
                              "_blank"
                            )
                          }
                          style={{
                            background: "#f59e0b",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            color: "white",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginTop: "4px",
                          }}
                        >
                          <Folder size={16} />
                          <span>Abrir carpeta</span>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Gestión Realizada desde la DT Antioquia
                  </p>
                  <div
                    style={{
                      padding: "16px",
                      backgroundColor: "#fef3c7",
                      borderRadius: "8px",
                      border: "1px solid #f59e0b",
                    }}
                  >
                    <p style={{ fontWeight: "500", lineHeight: "1.6" }}>
                      {selectedGestionCard.gestionRealizada}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalles */}
        {selectedCard && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {selectedCard.oac}
                    </h2>
                    <p style={{ color: "#6b7280" }}>{selectedCard.municipio}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    style={{
                      color: "#6b7280",
                      fontSize: "1.5rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Número de Convenio
                      </p>
                      <p style={{ fontWeight: "500", fontSize: "1.125rem" }}>
                        {selectedCard.convenio}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Interventoría
                      </p>
                      <p style={{ fontWeight: "500" }}>
                        {selectedCard.interventoria || "No especificada"}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        No. Interventoría
                      </p>
                      <p style={{ fontWeight: "500" }}>
                        {selectedCard.numeroInterventoria || "No especificado"}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Año
                      </p>
                      <p style={{ fontWeight: "500" }}>{selectedCard.year}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Estado
                      </p>
                      <div
                        style={{
                          ...statusBadgeStyle,
                          backgroundColor: getStatusColor(selectedCard.status),
                          display: "inline-flex",
                          marginTop: "4px",
                        }}
                      >
                        {getStatusIcon(selectedCard.status)}
                        <span style={{ marginLeft: "8px" }}>
                          {getStatusText(selectedCard.status)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        Tipo Radicado
                      </p>
                      <p style={{ fontWeight: "500" }}>
                        {selectedCard.tipoRadicado}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        No. Radicado
                      </p>
                      <p style={{ fontWeight: "500" }}>
                        {selectedCard.radicado}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      whiteSpace: "pre-line",
                    }}
                  >
                    Observaciones
                  </p>
                  <p style={{ fontWeight: "500", whiteSpace: "pre-line" }}>
                    {selectedCard.observaciones || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
