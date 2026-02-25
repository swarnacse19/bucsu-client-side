import { useNavigate, useLocation } from 'react-router';
import { FaMapMarkedAlt, FaBuilding, FaUserGraduate, FaEdit, FaArrowLeft, FaUniversity } from 'react-icons/fa';

const CreateElectionType = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAdmin = pathname.startsWith('/admin');
    const baseNav = isAdmin ? '/admin' : '/authority';

    const electionTypes = [
        {
            id: 'bucsu',
            title: 'BUCSU Election',
            description: 'University-wide Student Union election.',
            icon: FaUniversity,
            color: 'bg-blue-600',
            path: `${baseNav}/create-election/bucsu`,
        },
        {
            id: 'district',
            title: 'District Election',
            description: 'Create an election for a specific district.',
            icon: FaMapMarkedAlt,
            color: 'bg-indigo-500',
            path: `${baseNav}/create-election/district`,
        },
        {
            id: 'department',
            title: 'Department Election',
            description: 'Create an election for a specific department.',
            icon: FaBuilding,
            color: 'bg-emerald-500',
            path: `${baseNav}/create-election/department`,
        },
        {
            id: 'cr',
            title: 'CR Election',
            description: 'Class Representative election for a department.',
            icon: FaUserGraduate,
            color: 'bg-violet-500',
            path: `${baseNav}/create-election/cr`,
        },
        {
            id: 'custom',
            title: 'Custom Election',
            description: 'Define your own structure and fields.',
            icon: FaEdit,
            color: 'bg-amber-500',
            path: `${baseNav}/create-election/custom`,
        },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => navigate(baseNav)}
                    className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Select Election Type</h1>
                    <p className="text-slate-600">Choose the type of election you want to create</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {electionTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => navigate(type.path)}
                        className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-left"
                    >
                        <div  />

                        <div className="relative z-10 flex items-start gap-6">
                            <div className={`p-4 rounded-xl text-white shadow-lg ${type.color}`}>
                                <type.icon className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                    {type.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {type.description}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CreateElectionType;
