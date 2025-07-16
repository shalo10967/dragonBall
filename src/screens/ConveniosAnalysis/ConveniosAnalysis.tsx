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
} from "lucide-react";

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
    background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
    minHeight: "100vh",
    padding: "24px",
    color: "#374151",
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

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Filtros de Convenios OAC</h1>
          <p style={subtitleStyle}>Sistema de búsqueda y filtrado</p>
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
            Convenios Filtrados ({stats.total} convenios)
          </h3>

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
                      <p style={{ fontWeight: "500" }}>{selectedCard.tipoRadicado}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        No. Radicado
                      </p>
                      <p style={{ fontWeight: "500" }}>{selectedCard.radicado}</p>
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
