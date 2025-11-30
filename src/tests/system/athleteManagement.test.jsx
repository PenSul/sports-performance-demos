import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

// Simulated Athlete Management System
function AthleteManagementSystem() {
  const [athletes, setAthletes] = useState([
    { id: 1, name: 'John Smith', email: 'john@sports.com', sport: 'Swimming', status: 'Active', score: 87 },
    { id: 2, name: 'Jane Doe', email: 'jane@sports.com', sport: 'Athletics', status: 'Active', score: 92 },
    { id: 3, name: 'Bob Wilson', email: 'bob@sports.com', sport: 'Basketball', status: 'Injured', score: 75 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(null);

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = !selectedSport || athlete.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleAddAthlete = (newAthlete) => {
    const id = Math.max(...athletes.map(a => a.id)) + 1;
    setAthletes([...athletes, { ...newAthlete, id }]);
    setShowModal(false);
  };

  const handleEditAthlete = (updatedAthlete) => {
    setAthletes(athletes.map(a => a.id === updatedAthlete.id ? updatedAthlete : a));
    setEditingAthlete(null);
    setShowModal(false);
  };

  const handleDeleteAthlete = (id) => {
    setAthletes(athletes.filter(a => a.id !== id));
  };

  return (
    <div data-testid="athlete-management">
      <header className="flex justify-between items-center mb-4">
        <h1>Athlete Management</h1>
        <button
          data-testid="add-athlete-button"
          onClick={() => {
            setEditingAthlete(null);
            setShowModal(true);
          }}
        >
          Add Athlete
        </button>
      </header>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search athletes..."
          data-testid="search-input"
        />
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          data-testid="sport-filter"
        >
          <option value="">All Sports</option>
          <option value="Swimming">Swimming</option>
          <option value="Athletics">Athletics</option>
          <option value="Basketball">Basketball</option>
        </select>
      </div>

      <div data-testid="athlete-list">
        {filteredAthletes.map(athlete => (
          <div key={athlete.id} data-testid={`athlete-row-${athlete.id}`} className="p-4 border-b">
            <span data-testid="athlete-name">{athlete.name}</span>
            <span data-testid="athlete-sport">{athlete.sport}</span>
            <span data-testid="athlete-status">{athlete.status}</span>
            <button
              data-testid={`edit-button-${athlete.id}`}
              onClick={() => {
                setEditingAthlete(athlete);
                setShowModal(true);
              }}
            >
              Edit
            </button>
            <button
              data-testid={`delete-button-${athlete.id}`}
              onClick={() => handleDeleteAthlete(athlete.id)}
            >
              Delete
            </button>
          </div>
        ))}
        {filteredAthletes.length === 0 && (
          <p data-testid="no-results">No athletes found</p>
        )}
      </div>

      {showModal && (
        <div data-testid="athlete-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            data-testid="athlete-form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const athleteData = {
                id: editingAthlete?.id,
                name: formData.get('name'),
                email: formData.get('email'),
                sport: formData.get('sport'),
                status: formData.get('status') || 'Active',
                score: parseInt(formData.get('score')) || 0
              };
              if (editingAthlete) {
                handleEditAthlete(athleteData);
              } else {
                handleAddAthlete(athleteData);
              }
            }}
          >
            <input name="name" defaultValue={editingAthlete?.name || ''} placeholder="Name" data-testid="form-name" required />
            <input name="email" defaultValue={editingAthlete?.email || ''} placeholder="Email" data-testid="form-email" required />
            <select name="sport" defaultValue={editingAthlete?.sport || ''} data-testid="form-sport" required>
              <option value="">Select Sport</option>
              <option value="Swimming">Swimming</option>
              <option value="Athletics">Athletics</option>
              <option value="Basketball">Basketball</option>
            </select>
            <select name="status" defaultValue={editingAthlete?.status || 'Active'} data-testid="form-status">
              <option value="Active">Active</option>
              <option value="Injured">Injured</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input name="score" type="number" defaultValue={editingAthlete?.score || ''} placeholder="Score" data-testid="form-score" />
            <button type="submit" data-testid="form-submit">
              {editingAthlete ? 'Update' : 'Add'} Athlete
            </button>
            <button type="button" data-testid="form-cancel" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

describe('Athlete Management System Integration', () => {
  describe('Display Athletes', () => {
    it('should display all athletes initially', () => {
      render(<AthleteManagementSystem />);

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-2')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-3')).toBeInTheDocument();
    });

    it('should display athlete details in each row', () => {
      render(<AthleteManagementSystem />);

      const row1 = screen.getByTestId('athlete-row-1');
      expect(within(row1).getByTestId('athlete-name')).toHaveTextContent('John Smith');
      expect(within(row1).getByTestId('athlete-sport')).toHaveTextContent('Swimming');
      expect(within(row1).getByTestId('athlete-status')).toHaveTextContent('Active');
    });
  });

  describe('Search Functionality', () => {
    it('should filter athletes by name search', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.type(screen.getByTestId('search-input'), 'John');

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-3')).not.toBeInTheDocument();
    });

    it('should filter athletes by email search', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.type(screen.getByTestId('search-input'), 'jane@');

      expect(screen.queryByTestId('athlete-row-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-2')).toBeInTheDocument();
    });

    it('should show no results message when no matches', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.type(screen.getByTestId('search-input'), 'nonexistent');

      expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });
  });

  describe('Filter by Sport', () => {
    it('should filter athletes by selected sport', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.selectOptions(screen.getByTestId('sport-filter'), 'Swimming');

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('athlete-row-3')).not.toBeInTheDocument();
    });

    it('should show all athletes when filter is cleared', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.selectOptions(screen.getByTestId('sport-filter'), 'Swimming');
      await user.selectOptions(screen.getByTestId('sport-filter'), '');

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-2')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-3')).toBeInTheDocument();
    });
  });

  describe('Add Athlete', () => {
    it('should open modal when Add Athlete button is clicked', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.click(screen.getByTestId('add-athlete-button'));

      expect(screen.getByTestId('athlete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-form')).toBeInTheDocument();
    });

    it('should add new athlete and close modal on submit', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

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
  });

  describe('Edit Athlete', () => {
    it('should open modal with existing data when Edit is clicked', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.click(screen.getByTestId('edit-button-1'));

      expect(screen.getByTestId('athlete-modal')).toBeInTheDocument();
      expect(screen.getByTestId('form-name')).toHaveValue('John Smith');
    });

    it('should update athlete data on form submit', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      await user.click(screen.getByTestId('edit-button-1'));
      await user.clear(screen.getByTestId('form-name'));
      await user.type(screen.getByTestId('form-name'), 'John Updated');
      await user.click(screen.getByTestId('form-submit'));

      await waitFor(() => {
        expect(screen.queryByTestId('athlete-modal')).not.toBeInTheDocument();
        const row1 = screen.getByTestId('athlete-row-1');
        expect(within(row1).getByTestId('athlete-name')).toHaveTextContent('John Updated');
      });
    });
  });

  describe('Delete Athlete', () => {
    it('should remove athlete when Delete is clicked', async () => {
      const user = userEvent.setup();
      render(<AthleteManagementSystem />);

      expect(screen.getByTestId('athlete-row-1')).toBeInTheDocument();

      await user.click(screen.getByTestId('delete-button-1'));

      expect(screen.queryByTestId('athlete-row-1')).not.toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-2')).toBeInTheDocument();
      expect(screen.getByTestId('athlete-row-3')).toBeInTheDocument();
    });
  });
});
