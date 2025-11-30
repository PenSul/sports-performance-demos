import React, { useState } from 'react';
import { User, Search, Plus, Edit2, Trash2, X, Save, ChevronDown, Activity, Calendar, Award, Mail, Phone } from 'lucide-react';

function ManageAthleteProfiles() {
  const [athletes, setAthletes] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234 567 8901', sport: 'Track & Field', position: 'Sprinter', age: 24, height: '175 cm', weight: '62 kg', status: 'Active', joinDate: '2023-03-15', performanceScore: 94 },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', phone: '+1 234 567 8902', sport: 'Weightlifting', position: 'Heavyweight', age: 28, height: '185 cm', weight: '95 kg', status: 'Active', joinDate: '2022-08-20', performanceScore: 91 },
    { id: 3, name: 'Emma Williams', email: 'emma.w@email.com', phone: '+1 234 567 8903', sport: 'Swimming', position: 'Freestyle', age: 22, height: '172 cm', weight: '58 kg', status: 'Active', joinDate: '2023-01-10', performanceScore: 88 },
    { id: 4, name: 'James Rodriguez', email: 'james.r@email.com', phone: '+1 234 567 8904', sport: 'Basketball', position: 'Point Guard', age: 26, height: '188 cm', weight: '82 kg', status: 'Injured', joinDate: '2022-05-18', performanceScore: 85 },
    { id: 5, name: 'Lisa Thompson', email: 'lisa.t@email.com', phone: '+1 234 567 8905', sport: 'Tennis', position: 'Singles', age: 23, height: '168 cm', weight: '60 kg', status: 'Active', joinDate: '2023-06-22', performanceScore: 82 }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterSport, setFilterSport] = useState('All Sports');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', sport: '', position: '', age: '', height: '', weight: '', status: 'Active'
  });

  const sports = ['All Sports', 'Track & Field', 'Weightlifting', 'Swimming', 'Basketball', 'Tennis'];
  const statuses = ['All Status', 'Active', 'Injured', 'Inactive'];

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          athlete.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = filterSport === 'All Sports' || athlete.sport === filterSport;
    const matchesStatus = filterStatus === 'All Status' || athlete.status === filterStatus;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const openModal = (athlete = null) => {
    if (athlete) {
      setFormData({ ...athlete });
      setIsEditing(true);
    } else {
      setFormData({ name: '', email: '', phone: '', sport: '', position: '', age: '', height: '', weight: '', status: 'Active' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', sport: '', position: '', age: '', height: '', weight: '', status: 'Active' });
  };

  const handleSave = () => {
    if (isEditing) {
      setAthletes(athletes.map(a => a.id === formData.id ? formData : a));
    } else {
      const newAthlete = {
        ...formData,
        id: Math.max(...athletes.map(a => a.id)) + 1,
        joinDate: new Date().toISOString().split('T')[0],
        performanceScore: 75
      };
      setAthletes([...athletes, newAthlete]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setAthletes(athletes.filter(a => a.id !== id));
    setSelectedAthlete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Injured': return 'bg-red-100 text-red-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Athlete Profiles</h1>
              <p className="text-sm text-gray-500">Manage and view athlete information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search athletes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <select
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sports.map(sport => <option key={sport}>{sport}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => <option key={status}>{status}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Athlete</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Athlete</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Sport</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Score</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAthletes.map(athlete => (
                      <tr
                        key={athlete.id}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedAthlete?.id === athlete.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedAthlete(athlete)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                              {athlete.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{athlete.name}</p>
                              <p className="text-sm text-gray-500">{athlete.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-gray-800">{athlete.sport}</p>
                          <p className="text-sm text-gray-500">{athlete.position}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(athlete.status)}`}>
                            {athlete.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${athlete.performanceScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{athlete.performanceScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); openModal(athlete); }}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(athlete.id); }}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedAthlete ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {selectedAthlete.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedAthlete.name}</h3>
                  <p className="text-gray-500">{selectedAthlete.sport} - {selectedAthlete.position}</p>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-2 ${getStatusColor(selectedAthlete.status)}`}>
                    {selectedAthlete.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{selectedAthlete.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{selectedAthlete.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {selectedAthlete.joinDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Physical Stats</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-gray-800">{selectedAthlete.age}</p>
                      <p className="text-xs text-gray-500">Age</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-gray-800">{selectedAthlete.height}</p>
                      <p className="text-xs text-gray-500">Height</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-gray-800">{selectedAthlete.weight}</p>
                      <p className="text-xs text-gray-500">Weight</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Performance Score</h4>
                    <span className="text-2xl font-bold text-blue-600">{selectedAthlete.performanceScore}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${selectedAthlete.performanceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select an athlete to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? 'Edit Athlete' : 'Add New Athlete'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                  <input
                    type="text"
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="text"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 175 cm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 70 kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Active</option>
                    <option>Injured</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Update' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAthleteProfiles;
