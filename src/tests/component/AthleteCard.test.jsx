import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// AthleteCard component for testing
function AthleteCard({ athlete, onEdit, onDelete, onSelect }) {
  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Injured: 'bg-red-100 text-red-800',
      Inactive: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      data-testid="athlete-card"
      className="p-4 border rounded-lg cursor-pointer hover:shadow-md"
      onClick={() => onSelect?.(athlete)}
    >
      <div className="flex items-center gap-4">
        <div
          data-testid="athlete-avatar"
          className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
        >
          {athlete.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <h3 data-testid="athlete-name" className="font-semibold">
            {athlete.name}
          </h3>
          <p data-testid="athlete-sport" className="text-sm text-gray-500">
            {athlete.sport}
          </p>
        </div>
        <span
          data-testid="athlete-status"
          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(athlete.status)}`}
        >
          {athlete.status}
        </span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div data-testid="athlete-score" className="text-sm">
          <span className="text-gray-500">Performance: </span>
          <span className="font-medium">{athlete.performanceScore}%</span>
        </div>
        <div className="flex gap-2">
          <button
            data-testid="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(athlete);
            }}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            Edit
          </button>
          <button
            data-testid="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(athlete);
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

describe('AthleteCard Component', () => {
  const mockAthlete = {
    id: 1,
    name: 'John Smith',
    sport: 'Swimming',
    status: 'Active',
    performanceScore: 87
  };

  it('should render athlete information correctly', () => {
    render(<AthleteCard athlete={mockAthlete} />);

    expect(screen.getByTestId('athlete-name')).toHaveTextContent('John Smith');
    expect(screen.getByTestId('athlete-sport')).toHaveTextContent('Swimming');
    expect(screen.getByTestId('athlete-status')).toHaveTextContent('Active');
    expect(screen.getByTestId('athlete-score')).toHaveTextContent('87%');
  });

  it('should display avatar with initials', () => {
    render(<AthleteCard athlete={mockAthlete} />);

    expect(screen.getByTestId('athlete-avatar')).toHaveTextContent('JS');
  });

  it('should apply correct status color for Active', () => {
    render(<AthleteCard athlete={mockAthlete} />);

    const statusBadge = screen.getByTestId('athlete-status');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('should apply correct status color for Injured', () => {
    const injuredAthlete = { ...mockAthlete, status: 'Injured' };
    render(<AthleteCard athlete={injuredAthlete} />);

    const statusBadge = screen.getByTestId('athlete-status');
    expect(statusBadge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('should call onSelect when card is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<AthleteCard athlete={mockAthlete} onSelect={onSelect} />);

    await user.click(screen.getByTestId('athlete-card'));

    expect(onSelect).toHaveBeenCalledWith(mockAthlete);
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onSelect = vi.fn();
    render(<AthleteCard athlete={mockAthlete} onEdit={onEdit} onSelect={onSelect} />);

    await user.click(screen.getByTestId('edit-button'));

    expect(onEdit).toHaveBeenCalledWith(mockAthlete);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const onSelect = vi.fn();
    render(<AthleteCard athlete={mockAthlete} onDelete={onDelete} onSelect={onSelect} />);

    await user.click(screen.getByTestId('delete-button'));

    expect(onDelete).toHaveBeenCalledWith(mockAthlete);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should handle athlete with single name', () => {
    const singleNameAthlete = { ...mockAthlete, name: 'Madonna' };
    render(<AthleteCard athlete={singleNameAthlete} />);

    expect(screen.getByTestId('athlete-avatar')).toHaveTextContent('M');
  });
});
