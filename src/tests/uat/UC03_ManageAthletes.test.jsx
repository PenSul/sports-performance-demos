import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

/**
 * UC03 - Manage Athlete Profiles
 *
 * Primary Actor: Coach
 * Goal: Create, view, edit, and delete athlete profiles
 *
 * Preconditions:
 * - User is authenticated as Coach
 * - System has access to athlete database
 *
 * Main Success Scenarios:
 * 3a. View athlete list and details
 * 3b. Add new athlete profile
 * 3c. Edit existing athlete profile
 * 3d. Delete athlete profile
 *
 * Alternative Flows:
 * A1. Search and filter athletes
 * A2. Validation errors on form submission
 */

function ManageAthletesDemo() {
  const [athletes, setAthletes] = useState([
    { id: 1, name: 'John Smith', email: 'john@sports.com', sport: 'Swimming', status: 'Active', age: 24, height: 185, weight: 78, performanceScore: 87 },
    { id: 2, name: 'Jane Doe', email: 'jane@sports.com', sport: 'Athletics', status: 'Active', age: 22, height: 170, weight: 62, performanceScore: 92 },
    { id: 3, name: 'Bob Wilson', email: 'bob@sports.com', sport: 'Basketball', status: 'Injured', age: 26, height: 198, weight: 95, performanceScore: 75 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [formError, setFormError] = useState('');

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !sportFilter || athlete.sport === sportFilter;
    const matchesStatus = !statusFilter || athlete.status === statusFilter;
    return matchesSearch && matchesSport && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const sport = formData.get('sport');

    if (!name || !email || !sport) {
      setFormError('Please fill in all required fields');
      return;
    }

    const athleteData = {
      name,
      email,
      sport,
      status: formData.get('status') || 'Active',
      age: parseInt(formData.get('age')) || 0,
      height: parseInt(formData.get('height')) || 0,
      weight: parseInt(formData.get('weight')) || 0,
      performanceScore: parseInt(formData.get('performanceScore')) || 0
    };

    if (editingAthlete) {
      setAthletes(athletes.map(a => a.id === editingAthlete.id ? { ...athleteData, id: editingAthlete.id } : a));
    } else {
      const newId = Math.max(...athletes.map(a => a.id)) + 1;
      setAthletes([...athletes, { ...athleteData, id: newId }]);
    }

    setShowModal(false);
    setEditingAthlete(null);
    setFormError('');
  };

  const handleDelete = (athleteId) => {
    setAthletes(athletes.filter(a => a.id !== athleteId));
    if (selectedAthlete?.id === athleteId) {
      setSelectedAthlete(null);
    }
  };

  return (
    <div data-testid="manage-athletes-page" className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold" data-testid="page-title">Manage Athlete Profiles</h1>
        <button
          onClick={() => { setEditingAthlete(null); setShowModal(true); setFormError(''); }}
          data-testid="add-athlete-button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Athlete
        </button>
      </header>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex gap-4" data-testid="filter-section">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            data-testid="search-input"
            className="flex-1 px-3 py-2 border rounded"
          />
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            data-testid="sport-filter"
            className="px-3 py-2 border rounded"
          >
            <option value="">All Sports</option>
            <option value="Swimming">Swimming</option>
            <option value="Athletics">Athletics</option>
            <option value="Basketball">Basketball</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            data-testid="status-filter"
            className="px-3 py-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Injured">Injured</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow">
          <table className="w-full" data-testid="athlete-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Sport</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Score</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAthletes.map(athlete => (
                <tr
                  key={athlete.id}
                  data-testid={`athlete-row-${athlete.id}`}
                  onClick={() => setSelectedAthlete(athlete)}
                  className="border-t cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-4 py-3" data-testid="athlete-name">{athlete.name}</td>
                  <td className="px-4 py-3" data-testid="athlete-sport">{athlete.sport}</td>
                  <td className="px-4 py-3" data-testid="athlete-status">
                    <span className={`px-2 py-1 rounded text-sm ${
                      athlete.status === 'Active' ? 'bg-green-100 text-green-800' :
                      athlete.status === 'Injured' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {athlete.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" data-testid="athlete-score">{athlete.performanceScore}%</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); setEditingAthlete(athlete); setShowModal(true); setFormError(''); }}
                      data-testid={`edit-button-${athlete.id}`}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(athlete.id); }}
                      data-testid={`delete-button-${athlete.id}`}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAthletes.length === 0 && (
            <div className="p-8 text-center text-gray-500" data-testid="no-athletes-message">
              No athletes found matching your criteria
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          {selectedAthlete ? (
            <div data-testid="athlete-details">
              <h2 className="text-xl font-bold mb-4" data-testid="selected-athlete-name">{selectedAthlete.name}</h2>
              <div className="space-y-2">
                <p><span className="text-gray-500">Email:</span> <span data-testid="detail-email">{selectedAthlete.email}</span></p>
                <p><span className="text-gray-500">Sport:</span> <span data-testid="detail-sport">{selectedAthlete.sport}</span></p>
                <p><span className="text-gray-500">Status:</span> <span data-testid="detail-status">{selectedAthlete.status}</span></p>
                <p><span className="text-gray-500">Age:</span> <span data-testid="detail-age">{selectedAthlete.age}</span></p>
                <p><span className="text-gray-500">Height:</span> <span data-testid="detail-height">{selectedAthlete.height} cm</span></p>
                <p><span className="text-gray-500">Weight:</span> <span data-testid="detail-weight">{selectedAthlete.weight} kg</span></p>
                <p><span className="text-gray-500">Performance Score:</span> <span data-testid="detail-score">{selectedAthlete.performanceScore}%</span></p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8" data-testid="no-selection-message">
              Select an athlete to view details
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div data-testid="athlete-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4" data-testid="modal-title">
              {editingAthlete ? 'Edit Athlete' : 'Add New Athlete'}
            </h2>
            <form onSubmit={handleSubmit} data-testid="athlete-form">
              <div className="space-y-4">
                <input name="name" defaultValue={editingAthlete?.name || ''} placeholder="Name *" data-testid="form-name" className="w-full px-3 py-2 border rounded" />
                <input name="email" defaultValue={editingAthlete?.email || ''} placeholder="Email *" data-testid="form-email" className="w-full px-3 py-2 border rounded" />
                <select name="sport" defaultValue={editingAthlete?.sport || ''} data-testid="form-sport" className="w-full px-3 py-2 border rounded">
                  <option value="">Select Sport *</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Athletics">Athletics</option>
                  <option value="Basketball">Basketball</option>
                </select>
                <select name="status" defaultValue={editingAthlete?.status || 'Active'} data-testid="form-status" className="w-full px-3 py-2 border rounded">
                  <option value="Active">Active</option>
                  <option value="Injured">Injured</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <input name="age" type="number" defaultValue={editingAthlete?.age || ''} placeholder="Age" data-testid="form-age" className="w-full px-3 py-2 border rounded" />
                <input name="height" type="number" defaultValue={editingAthlete?.height || ''} placeholder="Height (cm)" data-testid="form-height" className="w-full px-3 py-2 border rounded" />
                <input name="weight" type="number" defaultValue={editingAthlete?.weight || ''} placeholder="Weight (kg)" data-testid="form-weight" className="w-full px-3 py-2 border rounded" />
                <input name="performanceScore" type="number" defaultValue={editingAthlete?.performanceScore || ''} placeholder="Performance Score" data-testid="form-score" className="w-full px-3 py-2 border rounded" />
              </div>
              {formError && (
                <div data-testid="form-error" className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                  {formError}
                </div>
              )}
              <div className="mt-6 flex gap-3">
                <button type="submit" data-testid="form-submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {editingAthlete ? 'Update' : 'Add'} Athlete
                </button>
                <button type="button" onClick={() => setShowModal(false)} data-testid="form-cancel" className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

describe('UC03 - Manage Athlete Profiles', () => {
  describe('Preconditions', () => {
    it('should display athlete management page with title', () => {
      render(<ManageAthletesDemo />);

      expect(screen.getByTestId('manage-athletes-page')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toHaveTextContent('Manage Athlete Profiles');
    });

    it('should have Add Athlete button available', () => {
      render(<ManageAthletesDemo />);

      expect(screen.getByTestId('add-athlete-button')).toBeInTheDocument();
    });

    it('should have search and filter controls', () => {
      render(<ManageAthletesDemo />);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('sport-filter')).toBeInTheDocument();
      expect(screen.getByTestId('status-filter')).toBeInTheDocument();
    });
  });

  describe('Scenario 3a - View Athlete List and Details', () => {
    it('should display list of all athletes', () => {
      render(<ManageAthletesDemo />);

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-2')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-3')).toBeInTheDocument();
    });

    it('should display athlete details when row is clicked', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('athlete-row-1'));

      expect(screen.getByTestId('athlete-details')).toBeInTheDocument();
      expect(screen.getByTestId('selected-athlete-name')).toHaveTextContent('John Smith');
      expect(screen.getByTestId('detail-email')).toHaveTextContent('john@sports.com');
      expect(screen.getByTestId('detail-sport')).toHaveTextContent('Swimming');
      expect(screen.getByTestId('detail-status')).toHaveTextContent('Active');
    });

    it('should show placeholder when no athlete is selected', () => {
      render(<ManageAthletesDemo />);

      expect(screen.getByTestId('no-selection-message')).toHaveTextContent('Select an athlete to view details');
    });
  });

  describe('Scenario 3b - Add New Athlete', () => {
    it('should open add athlete modal when button is clicked', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('add-athlete-button'));

      expect(screen.getByTestId('athlete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent('Add New Athlete');
    });

    it('should add new athlete when form is submitted with valid data', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('add-athlete-button'));
      await user.type(screen.getByTestId('form-name'), 'New Athlete');
      await user.type(screen.getByTestId('form-email'), 'new@sports.com');
      await user.selectOptions(screen.getByTestId('form-sport'), 'Swimming');
      await user.click(screen.getByTestId('form-submit'));

      await waitFor(() => {
        expect(screen.queryByTestId('athlete-modal')).not.toBeInTheDocument();
        expect(screen.getByTestId('athlete-row-4')).toBeInTheDocument();
      });
    });

    it('should close modal when cancel is clicked', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('add-athlete-button'));
      await user.click(screen.getByTestId('form-cancel'));

      expect(screen.queryByTestId('athlete-modal')).not.toBeInTheDocument();
    });
  });

  describe('Scenario 3c - Edit Existing Athlete', () => {
    it('should open edit modal with pre-filled data', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('edit-button-1'));

      expect(screen.getByTestId('athlete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal-title')).toHaveTextContent('Edit Athlete');
      expect(screen.getByTestId('form-name')).toHaveValue('John Smith');
      expect(screen.getByTestId('form-email')).toHaveValue('john@sports.com');
    });

    it('should update athlete when edit form is submitted', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('edit-button-1'));
      await user.clear(screen.getByTestId('form-name'));
      await user.type(screen.getByTestId('form-name'), 'John Updated');
      await user.click(screen.getByTestId('form-submit'));

      await waitFor(() => {
        expect(screen.queryByTestId('athlete-modal')).not.toBeInTheDocument();
        const row = screen.getByTestId('athlete-row-1');
        expect(within(row).getByTestId('athlete-name')).toHaveTextContent('John Updated');
      });
    });
  });

  describe('Scenario 3d - Delete Athlete', () => {
    it('should remove athlete when delete is clicked', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();

      await user.click(screen.getByTestId('delete-button-1'));

      expect(screen.queryByTestId('athlete-row-1')).not.toBeInTheDocument();
    });

    it('should clear details panel if deleted athlete was selected', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('athlete-row-1'));
      expect(screen.getByTestId('athlete-details')).toBeInTheDocument();

      await user.click(screen.getByTestId('delete-button-1'));

      expect(screen.getByTestId('no-selection-message')).toBeInTheDocument();
    });
  });

  describe('Alternative Flow A1 - Search and Filter', () => {
    it('should filter athletes by search term', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.type(screen.getByTestId('search-input'), 'John');

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-3')).not.toBeInTheDocument();
    });

    it('should filter athletes by sport', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.selectOptions(screen.getByTestId('sport-filter'), 'Swimming');

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-2')).not.toBeInTheDocument();
    });

    it('should filter athletes by status', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.selectOptions(screen.getByTestId('status-filter'), 'Injured');

      expect(screen.queryByTestId('athlete-row-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-2')).not.toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-3')).toBeInTheDocument();
    });

    it('should show no athletes message when no matches', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.type(screen.getByTestId('search-input'), 'nonexistent');

      expect(screen.getByTestId('no-athletes-message')).toHaveTextContent('No athletes found');
    });
  });

  describe('Alternative Flow A2 - Validation Errors', () => {
    it('should show error when required fields are empty', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('add-athlete-button'));
      await user.click(screen.getByTestId('form-submit'));

      expect(screen.getByTestId('form-error')).toHaveTextContent('Please fill in all required fields');
    });

    it('should show error when sport is not selected', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('add-athlete-button'));
      await user.type(screen.getByTestId('form-name'), 'Test Name');
      await user.type(screen.getByTestId('form-email'), 'test@email.com');
      await user.click(screen.getByTestId('form-submit'));

      expect(screen.getByTestId('form-error')).toHaveTextContent('Please fill in all required fields');
    });
  });

  describe('Postconditions', () => {
    it('should persist changes after adding athlete', async () => {
      const user = userEvent.setup();
      render(<ManageAthletesDemo />);

      await user.click(screen.getByTestId('add-athlete-button'));
      await user.type(screen.getByTestId('form-name'), 'Persisted Athlete');
      await user.type(screen.getByTestId('form-email'), 'persist@sports.com');
      await user.selectOptions(screen.getByTestId('form-sport'), 'Athletics');
      await user.click(screen.getByTestId('form-submit'));

      await waitFor(() => {
        const newRow = screen.getByTestId('athlete-row-4');
        expect(within(newRow).getByTestId('athlete-name')).toHaveTextContent('Persisted Athlete');
      });

      await user.click(screen.getByTestId('athlete-row-4'));
      expect(screen.getByTestId('detail-email')).toHaveTextContent('persist@sports.com');
    });
  });
});
