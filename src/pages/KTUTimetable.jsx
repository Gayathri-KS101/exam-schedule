import { useState } from "react";

const timetableData = [
  { date: "24-04-2026", day: "Friday",    slot: "A FN", code: "ITT302",       subject: "IWT",                 sem: "S6", full: "Internet Working with tcp/ip" },
  { date: "28-04-2026", day: "Tuesday",   slot: "B FN", code: "ITT304",       subject: "AAD",                sem: "S6", full: "Algorithm Analysis & Design" },
  { date: "02-05-2026", day: "Saturday",  slot: "C FN", code: "ITT306",       subject: "DS",                 sem: "S6", full: "Data Science" },
  { date: "05-05-2026", day: "Tuesday",   slot: "D FN", code: "ITTXXX",       subject: "Soft Computing",     sem: "S6", full: "Program Elective-I" },
  { date: "08-05-2026", day: "Friday",    slot: "E FN", code: "HUT300",       subject: "IEFT",               sem: "S6", full: "Industrial Eco & Foreign Trade" },
  { date: "12-05-2026", day: "Tuesday",   slot: "F FN", code: "ITT308",       subject: "Comprehensive",      sem: "S6", full: "Comprehensive Exam" },
  { date: "13-05-2026", day: "Wednesday", slot: "A AN", code: "MAT208",       subject: "MATHS",              sem: "S4", full: "Mathematics" },
  { date: "18-05-2026", day: "Monday",    slot: "C AN", code: "ITT204",       subject: "CO",                 sem: "S4", full: "Computer Organization" },
  { date: "03-06-2026", day: "Wednesday", slot: "B FN", code: "ITT303",       subject: "OS",                 sem: "S5", full: "Operating Systems" },
  { date: "08-06-2026", day: "Monday",    slot: "D FN", code: "ITT307",       subject: "FLAT",               sem: "S5", full: "Formal Languages & Automata Theory" },
  { date: "10-06-2026", day: "Wednesday", slot: "E FN", code: "ITT309",       subject: "MSE",                sem: "S5", full: "Management of Software Engineers" },
];

const semColors = {
  S4: { bg: "#FFF3E0", accent: "#FF8C00", badge: "#FF6B00", text: "#7A3B00" },
  S5: { bg: "#E8F5E9", accent: "#2E7D32", badge: "#1B5E20", text: "#1B5E20" },
  S6: { bg: "#E3F2FD", accent: "#1565C0", badge: "#0D47A1", text: "#0D47A1" },
};

const getDaysUntil = (dateStr) => {
  const [d, m, y] = dateStr.split("-").map(Number);
  const exam = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
  return diff;
};

export default function KTUTimetable() {
  const [filter, setFilter] = useState("ALL");
  const [hoveredRow, setHoveredRow] = useState(null);

  const filtered = filter === "ALL" ? timetableData : timetableData.filter(e => e.sem === filter);

  const totalExams = timetableData.length;
  const nextExam = timetableData.find(e => getDaysUntil(e.date) >= 0);
  const daysToNext = nextExam ? getDaysUntil(nextExam.date) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "32px 16px",
      color: "#fff",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 8,
          padding: "4px 18px",
          fontSize: 11,
          letterSpacing: 4,
          color: "#a78bfa",
          marginBottom: 14,
          textTransform: "uppercase",
        }}>
          KTU · 2019 Scheme · B.Tech IT
        </div>
        <h1 style={{
          fontSize: "clamp(24px, 6vw, 44px)",
          fontWeight: 700,
          margin: "0 0 8px",
          letterSpacing: -1,
          background: "linear-gradient(90deg, #e0c3fc, #8ec5fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Exam Timetable 2026
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
          S4 · S5 · S6 — Selected Subjects Only
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        flexWrap: "wrap",
        marginBottom: 28,
      }}>
        {[
          { label: "Total Exams", value: totalExams },
          { label: "Next Exam In", value: daysToNext !== null ? `${daysToNext}d` : "—" },
          { label: "Next Subject", value: nextExam?.subject || "—" },
          { label: "Semesters", value: "S4 S5 S6" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "12px 24px",
            textAlign: "center",
            minWidth: 100,
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#e0c3fc" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
        {["ALL", "S4", "S5", "S6"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 24px",
            borderRadius: 999,
            border: filter === f ? "none" : "1px solid rgba(255,255,255,0.15)",
            background: filter === f
              ? "linear-gradient(135deg, #a78bfa, #60a5fa)"
              : "rgba(255,255,255,0.05)",
            color: filter === f ? "#fff" : "#94a3b8",
            fontWeight: filter === f ? 700 : 400,
            fontSize: 14,
            cursor: "pointer",
            letterSpacing: 1,
            transition: "all 0.2s",
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{
        maxWidth: 860,
        margin: "0 auto",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
      }}>
        {/* Table Header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "130px 70px 90px 100px 1fr 55px",
          background: "rgba(255,255,255,0.08)",
          padding: "14px 20px",
          fontSize: 11,
          letterSpacing: 2,
          color: "#a78bfa",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          fontFamily: "'Georgia', serif",
        }}>
          <span>Date</span>
          <span>Slot</span>
          <span>Code</span>
          <span>Subject</span>
          <span>Full Name</span>
          <span style={{ textAlign: "center" }}>Sem</span>
        </div>

        {/* Rows */}
        {filtered.map((exam, i) => {
          const daysLeft = getDaysUntil(exam.date);
          const isPast = daysLeft < 0;
          const isToday = daysLeft === 0;
          const isSoon = daysLeft >= 0 && daysLeft <= 3;
          const colors = semColors[exam.sem];

          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 70px 90px 100px 1fr 55px",
                padding: "16px 20px",
                borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: hoveredRow === i
                  ? "rgba(167,139,250,0.08)"
                  : isPast
                  ? "rgba(0,0,0,0.15)"
                  : "transparent",
                transition: "background 0.2s",
                opacity: isPast ? 0.45 : 1,
                alignItems: "center",
                cursor: "default",
              }}
            >
              {/* Date */}
              <div>
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: isToday ? "#fbbf24" : isSoon ? "#f87171" : "#e2e8f0",
                }}>
                  {exam.date}
                </div>
                <div style={{ fontSize: 11, color: "#475569" }}>{exam.day}</div>
                {isToday && (
                  <div style={{
                    display: "inline-block",
                    background: "#fbbf24",
                    color: "#000",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 999,
                    letterSpacing: 1,
                    marginTop: 3,
                  }}>TODAY</div>
                )}
                {isSoon && !isToday && (
                  <div style={{
                    display: "inline-block",
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 999,
                    letterSpacing: 1,
                    marginTop: 3,
                  }}>{daysLeft}D LEFT</div>
                )}
              </div>

              {/* Slot */}
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#94a3b8",
                fontFamily: "monospace",
              }}>
                {exam.slot}
              </div>

              {/* Code */}
              <div style={{
                fontSize: 12,
                color: "#60a5fa",
                fontFamily: "monospace",
                fontWeight: 600,
              }}>
                {exam.code}
              </div>

              {/* Subject */}
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#f1f5f9",
              }}>
                {exam.subject}
              </div>

              {/* Full Name */}
              <div style={{
                fontSize: 12,
                color: "#64748b",
                paddingRight: 12,
              }}>
                {exam.full}
              </div>

              {/* Sem Badge */}
              <div style={{ textAlign: "center" }}>
                <span style={{
                  display: "inline-block",
                  background: colors.badge,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 10px",
                  borderRadius: 6,
                  letterSpacing: 0.5,
                }}>
                  {exam.sem}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        marginTop: 28,
        flexWrap: "wrap",
      }}>
        {Object.entries(semColors).map(([sem, c]) => (
          <div key={sem} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              background: c.badge,
              width: 28,
              height: 16,
              borderRadius: 4,
              display: "inline-block",
            }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{sem}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#fbbf24", fontSize: 13 }}>★ Today</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#f87171", fontSize: 13 }}>⚠ Due Soon (≤3 days)</span>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        textAlign: "center",
        color: "#334155",
        fontSize: 12,
        marginTop: 32,
        letterSpacing: 1,
      }}>
        Based on KTU Exam Calendar published 02/03/2026 · via KTUMAGIC
      </p>
    </div>
  );
}
