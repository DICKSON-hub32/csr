// import React, { useState, useEffect } from "react";
// import {
//   MapPin,
//   Upload,
//   FileText,
//   BarChart3,
//   Download,
//   Plus,
//   Filter,
//   X,
//   Camera,
//   Users,
//   Target,
//   Calendar
// } from "lucide-react";

// const CSRToolkit = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [filterRegion, setFilterRegion] = useState("all");
//   const [stats, setStats] = useState({
//     totalProjects: 0,
//     totalBeneficiaries: 0,
//     activeRegions: 0,
//     completionRate: 0
//   });

//   // Initialize with sample data
//   useEffect(() => {
//     const sampleProjects = [
//       {
//         id: 1,
//         title: "Tree Planting Initiative",
//         type: "Environmental",
//         region: "Nairobi",
//         location: { lat: -1.2921, lng: 36.8219 },
//         date: "2025-11-01",
//         beneficiaries: 500,
//         status: "Completed",
//         description: "Planted 1000 trees in community parks",
//         photos: ["tree1.jpg", "tree2.jpg"],
//         metrics: { trees: 1000, volunteers: 45 }
//       },
//       {
//         id: 2,
//         title: "Clean Water Project",
//         type: "Infrastructure",
//         region: "Mombasa",
//         location: { lat: -4.0435, lng: 39.6682 },
//         date: "2025-10-15",
//         beneficiaries: 1200,
//         status: "In Progress",
//         description: "Installing water purification systems",
//         photos: ["water1.jpg"],
//         metrics: { systems: 3, households: 400 }
//       },
//       {
//         id: 3,
//         title: "Education Support Program",
//         type: "Education",
//         region: "Kisumu",
//         location: { lat: -0.0917, lng: 34.768 },
//         date: "2025-11-10",
//         beneficiaries: 800,
//         status: "Completed",
//         description: "Distributed school supplies and books",
//         photos: ["edu1.jpg", "edu2.jpg"],
//         metrics: { students: 800, schools: 5 }
//       },
//       {
//         id: 4,
//         title: "Healthcare Outreach",
//         type: "Health",
//         region: "Nakuru",
//         location: { lat: -0.3031, lng: 36.08 },
//         date: "2025-09-20",
//         beneficiaries: 600,
//         status: "Completed",
//         description: "Free medical camps and vaccination drives",
//         photos: ["health1.jpg"],
//         metrics: { patients: 600, vaccinations: 450 }
//       }
//     ];
//     setProjects(sampleProjects);
//     calculateStats(sampleProjects);
//   }, []);

//   const calculateStats = (projectList) => {
//     const filtered =
//       filterRegion === "all"
//         ? projectList
//         : projectList.filter((p) => p.region === filterRegion);
//     const totalBeneficiaries = filtered.reduce(
//       (sum, p) => sum + p.beneficiaries,
//       0
//     );
//     const regions = [...new Set(filtered.map((p) => p.region))].length;
//     const completed = filtered.filter((p) => p.status === "Completed").length;
//     const completionRate =
//       filtered.length > 0
//         ? ((completed / filtered.length) * 100).toFixed(1)
//         : 0;

//     setStats({
//       totalProjects: filtered.length,
//       totalBeneficiaries,
//       activeRegions: regions,
//       completionRate
//     });
//   };

//   useEffect(() => {
//     calculateStats(projects);
//   }, [filterRegion, projects]);

//   const handleAddProject = (formData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...formData,
//       date: new Date().toISOString().split("T")[0],
//       photos: [],
//       status: "In Progress"
//     };
//     setProjects([...projects, newProject]);
//     setShowAddForm(false);
//   };

//   const exportReport = () => {
//     const filtered =
//       filterRegion === "all"
//         ? projects
//         : projects.filter((p) => p.region === filterRegion);
//     const report = {
//       generatedDate: new Date().toISOString(),
//       summary: stats,
//       projects: filtered
//     };
//     const blob = new Blob([JSON.stringify(report, null, 2)], {
//       type: "application/json"
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `CSR_Report_${new Date().toISOString().split("T")[0]}.json`;
//     a.click();
//   };

//   // Dashboard component
//   const Dashboard = () => (
//     <div className="space-y-6">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {[
//           {
//             label: "Total Projects",
//             value: stats.totalProjects,
//             color: "blue",
//             icon: Target
//           },
//           {
//             label: "Beneficiaries",
//             value: stats.totalBeneficiaries.toLocaleString(),
//             color: "green",
//             icon: Users
//           },
//           {
//             label: "Active Regions",
//             value: stats.activeRegions,
//             color: "purple",
//             icon: MapPin
//           },
//           {
//             label: "Completion Rate",
//             value: `${stats.completionRate}%`,
//             color: "orange",
//             icon: BarChart3
//           }
//         ].map(({ label, value, color, icon: Icon }) => (
//           <div
//             key={label}
//             className={`bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg p-6 text-white`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className={`text-${color}-100 text-sm`}>{label}</p>
//                 <p className="text-3xl font-bold mt-2">{value}</p>
//               </div>
//               <Icon className={`w-10 h-10 text-${color}-200`} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Map Simulation */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">
//             Project Distribution Map
//           </h3>
//           <select
//             value={filterRegion}
//             onChange={(e) => setFilterRegion(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <option value="all">All Regions</option>
//             <option value="Nairobi">Nairobi</option>
//             <option value="Mombasa">Mombasa</option>
//             <option value="Kisumu">Kisumu</option>
//             <option value="Nakuru">Nakuru</option>
//           </select>
//         </div>
//         <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
//           {(filterRegion === "all"
//             ? projects
//             : projects.filter((p) => p.region === filterRegion)
//           ).map((project, idx) => (
//             <div
//               key={project.id}
//               className="absolute bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform"
//               style={{
//                 left: `${20 + ((idx * 15) % 60)}%`,
//                 top: `${25 + ((idx * 20) % 50)}%`
//               }}
//               onClick={() => {
//                 setSelectedProject(project);
//                 setActiveTab("projects");
//               }}
//               title={project.title}
//             >
//               {idx + 1}
//             </div>
//           ))}
//           <div className="text-center z-10">
//             <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
//             <p className="text-gray-500 font-medium">Interactive Project Map</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Other tab components are unchanged (ProjectsList, AddProjectForm, Reports)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Target className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   CSR Reporting Toolkit
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Track, Monitor & Report CSR Activities
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Filter className="w-5 h-5 text-gray-400" />
//               <select
//                 value={filterRegion}
//                 onChange={(e) => setFilterRegion(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Regions</option>
//                 <option value="Nairobi">Nairobi</option>
//                 <option value="Mombasa">Mombasa</option>
//                 <option value="Kisumu">Kisumu</option>
//                 <option value="Nakuru">Nakuru</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex space-x-2 border-b border-gray-200 mb-6">
//           {[
//             { id: "dashboard", label: "Dashboard", icon: BarChart3 },
//             { id: "projects", label: "Projects", icon: MapPin },
//             { id: "reports", label: "Reports", icon: FileText }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
//                 activeTab === tab.id
//                   ? "text-blue-600 border-b-2 border-blue-600"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               <tab.icon className="w-5 h-5" />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Dynamic Tab Rendering */}
//         {activeTab === "dashboard" && <Dashboard />}
//         {activeTab === "projects" && (
//           <p className="text-gray-600">
//             Project management UI here (from Claude’s code)
//           </p>
//         )}
//         {activeTab === "reports" && (
//           <p className="text-gray-600">
//             Analytics and export UI here (from Claude’s code)
//           </p>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 py-6 border-t border-gray-200">
//         <div className="text-center text-gray-500 text-sm">
//           <p className="font-medium mb-2">CSR Reporting Toolkit - Simulation</p>
//           <p className="text-xs">
//             Built with React + TailwindCSS | Designed by Dickson Esamai Mukwe
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CSRToolkit;

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Upload,
  FileText,
  BarChart3,
  Download,
  Plus,
  Filter,
  X,
  Camera,
  Users,
  Target,
  Calendar,
  TreePine,
  Droplet,
  GraduationCap,
  HeartPulse,
  CheckCircle2,
  Clock,
  Map,
  FileDown,
  Search,
  ChevronRight
} from "lucide-react";

const CSRToolkit = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterRegion, setFilterRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBeneficiaries: 0,
    activeRegions: 0,
    completionRate: 0
  });

  useEffect(() => {
    const sampleProjects = [
      {
        id: 1,
        title: "Urban Tree Planting Drive",
        type: "Environmental",
        region: "Nairobi",
        location: { lat: -1.2921, lng: 36.8219 },
        date: "2025-11-01",
        beneficiaries: 500,
        status: "Completed",
        description:
          "Planted 1000 indigenous trees in community parks and schools",
        photos: 3,
        metrics: { trees: 1000, volunteers: 45 },
        icon: TreePine
      },
      {
        id: 2,
        title: "Coastal Clean Water Project",
        type: "Infrastructure",
        region: "Mombasa",
        location: { lat: -4.0435, lng: 39.6682 },
        date: "2025-10-15",
        beneficiaries: 1200,
        status: "In Progress",
        description: "Installing solar-powered water purification systems",
        photos: 5,
        metrics: { systems: 3, households: 400 },
        icon: Droplet
      },
      {
        id: 3,
        title: "Back to School Program",
        type: "Education",
        region: "Kisumu",
        location: { lat: -0.0917, lng: 34.768 },
        date: "2025-11-10",
        beneficiaries: 800,
        status: "Completed",
        description:
          "Distributed learning materials to 5 public primary schools",
        photos: 8,
        metrics: { students: 800, schools: 5 },
        icon: GraduationCap
      },
      {
        id: 4,
        title: "Mobile Health Camps",
        type: "Health",
        region: "Nakuru",
        location: { lat: -0.3031, lng: 36.08 },
        date: "2025-09-20",
        beneficiaries: 600,
        status: "Completed",
        description: "Free medical checkups and vaccination drives",
        photos: 6,
        metrics: { patients: 600, vaccinations: 450 },
        icon: HeartPulse
      }
    ];
    setProjects(sampleProjects);
    calculateStats(sampleProjects);
  }, []);

  const calculateStats = (projectList) => {
    const filtered =
      filterRegion === "all"
        ? projectList
        : projectList.filter((p) => p.region === filterRegion);
    const totalBeneficiaries = filtered.reduce(
      (sum, p) => sum + p.beneficiaries,
      0
    );
    const regions = [...new Set(filtered.map((p) => p.region))].length;
    const completed = filtered.filter((p) => p.status === "Completed").length;
    const completionRate =
      filtered.length > 0
        ? ((completed / filtered.length) * 100).toFixed(1)
        : 0;

    setStats({
      totalProjects: filtered.length,
      totalBeneficiaries,
      activeRegions: regions,
      completionRate
    });
  };

  useEffect(() => {
    calculateStats(projects);
  }, [filterRegion, projects]);

  const filteredProjects = projects
    .filter((p) => filterRegion === "all" || p.region === filterRegion)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.region.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getStatusColor = (status) => {
    return status === "Completed"
      ? "text-green-600 bg-green-50"
      : "text-amber-600 bg-amber-50";
  };

  const getTypeColor = (type) => {
    const colors = {
      Environmental: "from-emerald-500 to-teal-600",
      Infrastructure: "from-blue-500 to-cyan-600",
      Education: "from-purple-500 to-indigo-600",
      Health: "from-rose-500 to-pink-600"
    };
    return colors[type] || "from-gray-500 to-gray-600";
  };

  const exportReport = () => {
    alert("Report exported successfully! (JSON format in production)");
  };

  // Dashboard
  const Dashboard = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Projects",
            value: stats.totalProjects,
            icon: Target,
            color: "from-blue-500 to-blue-700"
          },
          {
            label: "People Impacted",
            value: stats.totalBeneficiaries.toLocaleString(),
            icon: Users,
            color: "from-emerald-500 to-green-700"
          },
          {
            label: "Active Regions",
            value: stats.activeRegions,
            icon: MapPin,
            color: "from-purple-500 to-purple-700"
          },
          {
            label: "Completion Rate",
            value: `${stats.completionRate}%`,
            icon: BarChart3,
            color: "from-orange-500 to-red-600"
          }
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold mt-2">{stat.value}</p>
              </div>
              <stat.icon className="w-12 h-12 opacity-90" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Map className="w-8 h-8" />
                    Project Locations
                  </h3>
                  <p className="text-blue-100 mt-1">
                    Click pins to view details
                  </p>
                </div>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="all" className="text-gray-800">
                    All Regions
                  </option>
                  {["Nairobi", "Mombasa", "Kisumu", "Nakuru"].map((r) => (
                    <option key={r} value={r} className="text-gray-800">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
              </div>

              {filteredProjects.map((project, idx) => {
                const Icon = project.icon;
                return (
                  <div
                    key={project.id}
                    className="absolute group cursor-pointer transform hover:scale-150 transition-all duration-300 z-10"
                    style={{
                      left: `${15 + ((idx * 22) % 70)}%`,
                      top: `${20 + ((idx * 28) % 60)}%`
                    }}
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveTab("projects");
                    }}
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${getTypeColor(project.type).replace("from-", "bg-gradient-to-br from-").split(" ")[0]} shadow-2xl flex items-center justify-center border-4 border-white`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.title}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900"></div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <MapPin className="w-20 h-20 text-blue-400/30 mx-auto" />
                  <p className="text-gray-500 font-semibold text-lg mt-4">
                    Kenya CSR Projects Map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {projects.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${getTypeColor(p.type)} flex items-center justify-center`}
                  >
                    <p.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.region} • {p.date}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(p.status)}`}
                  >
                    {p.status === "Completed" ? (
                      <CheckCircle2 className="w-3 h-3 inline" />
                    ) : (
                      <Clock className="w-3 h-3 inline" />
                    )}{" "}
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Projects List
  const ProjectsList = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">All CSR Projects</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add New Project
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`h-32 bg-gradient-to-r ${getTypeColor(project.type)} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-white/90">{project.region}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <Camera className="w-4 h-4" /> {project.photos} photos
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTypeColor(project.type)} flex items-center justify-center`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {project.type}
                        </p>
                        <p className="text-sm text-gray-500">{project.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />{" "}
                        {project.beneficiaries.toLocaleString()}
                      </span>
                      {project.metrics.trees && (
                        <span>🌳 {project.metrics.trees}</span>
                      )}
                      {project.metrics.systems && (
                        <span>💧 {project.metrics.systems}</span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Reports Tab
  const Reports = () => (
    <div className="space-y-8">
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white">
        <FileText className="w-20 h-20 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-3">CSR Performance Reports</h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Generate comprehensive reports with impact metrics, regional analysis,
          and visual data
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Monthly Impact Report",
            type: "PDF",
            icon: FileDown,
            color: "from-red-500 to-rose-600"
          },
          {
            title: "Regional Summary",
            type: "Excel",
            icon: Download,
            color: "from-green-500 to-emerald-600"
          },
          {
            title: "Annual CSR Overview",
            type: "PDF",
            icon: FileText,
            color: "from-purple-500 to-indigo-600"
          }
        ].map((report, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-3 border border-gray-100"
          >
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${report.color} flex items-center justify-center`}
            >
              <report.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {report.title}
            </h3>
            <p className="text-gray-600 mb-6">
              Includes charts, metrics, and photos
            </p>
            <button
              onClick={exportReport}
              className={`w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r ${report.color} hover:opacity-90 transition-opacity`}
            >
              Download {report.type}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-lg shadow-xl border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CSR Reporting Toolkit
                  </h1>
                  <p className="text-sm text-gray-500">
                    Real-time Monitoring • Transparency • Impact
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="bg-transparent focus:outline-none font-medium"
                  >
                    <option value="all">All Kenya</option>
                    {["Nairobi", "Mombasa", "Kisumu", "Nakuru"].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="flex space-x-1 bg-white/60 backdrop-blur rounded-2xl shadow-lg p-2 mb-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "projects", label: "Projects", icon: MapPin },
              { id: "reports", label: "Reports", icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-6 h-6" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="animate-fadeIn">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "projects" && <ProjectsList />}
            {activeTab === "reports" && <Reports />}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-10 bg-gradient-to-t from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-2xl font-bold mb-2">CSR Reporting Toolkit</p>
            <p className="text-gray-400">
              Empowering transparent and impactful corporate social
              responsibility
            </p>
            <p className="text-sm text-gray-500 mt-6">
              © 2025 • Built with React + Tailwind CSS • Designed by Dickson
              Esamai Mukwe
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadefadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </>
  );
};

export default CSRToolkit;
