import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

// SearchFilter component for testing
function SearchFilter({ onSearch, onFilterChange, sports = [], statuses = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleSportChange = (e) => {
    const value = e.target.value;
    setSelectedSport(value);
    onFilterChange?.({ sport: value, status: selectedStatus });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    onFilterChange?.({ sport: selectedSport, status: value });
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedSport('');
    setSelectedStatus('');
    onSearch?.('');
    onFilterChange?.({ sport: '', status: '' });
  };

  return (
    <div data-testid="search-filter" className="flex gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search athletes..."
        data-testid="search-input"
        className="border rounded px-3 py-2"
      />
      <select
        value={selectedSport}
        onChange={handleSportChange}
        data-testid="sport-filter"
        className="border rounded px-3 py-2"
      >
        <option value="">All Sports</option>
        {sports.map(sport => (
          <option key={sport} value={sport}>{sport}</option>
        ))}
      </select>
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        data-testid="status-filter"
        className="border rounded px-3 py-2"
      >
        <option value="">All Statuses</option>
        {statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <button
        onClick={handleClear}
        data-testid="clear-button"
        className="px-3 py-2 text-gray-600 hover:text-gray-800"
      >
        Clear
      </button>
    </div>
  );
}

describe('SearchFilter Component', () => {
  const mockSports = ['Swimming', 'Athletics', 'Basketball'];
  const mockStatuses = ['Active', 'Injured', 'Inactive'];

  it('should render all filter elements', () => {
    render(<SearchFilter sports={mockSports} statuses={mockStatuses} />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('sport-filter')).toBeInTheDocument();
    expect(screen.getByTestId('status-filter')).toBeInTheDocument();
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
  });

  it('should render sport options', () => {
    render(<SearchFilter sports={mockSports} statuses={mockStatuses} />);

    const sportSelect = screen.getByTestId('sport-filter');
    expect(sportSelect).toContainElement(screen.getByText('All Sports'));
    expect(sportSelect).toContainElement(screen.getByText('Swimming'));
    expect(sportSelect).toContainElement(screen.getByText('Athletics'));
    expect(sportSelect).toContainElement(screen.getByText('Basketball'));
  });

  it('should render status options', () => {
    render(<SearchFilter sports={mockSports} statuses={mockStatuses} />);

    const statusSelect = screen.getByTestId('status-filter');
    expect(statusSelect).toContainElement(screen.getByText('All Statuses'));
    expect(statusSelect).toContainElement(screen.getByText('Active'));
    expect(statusSelect).toContainElement(screen.getByText('Injured'));
  });

  it('should call onSearch when typing in search input', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchFilter onSearch={onSearch} sports={mockSports} statuses={mockStatuses} />);

    await user.type(screen.getByTestId('search-input'), 'John');

    expect(onSearch).toHaveBeenLastCalledWith('John');
  });

  it('should call onFilterChange when sport is selected', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<SearchFilter onFilterChange={onFilterChange} sports={mockSports} statuses={mockStatuses} />);

    await user.selectOptions(screen.getByTestId('sport-filter'), 'Swimming');

    expect(onFilterChange).toHaveBeenCalledWith({ sport: 'Swimming', status: '' });
  });

  it('should call onFilterChange when status is selected', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<SearchFilter onFilterChange={onFilterChange} sports={mockSports} statuses={mockStatuses} />);

    await user.selectOptions(screen.getByTestId('status-filter'), 'Active');

    expect(onFilterChange).toHaveBeenCalledWith({ sport: '', status: 'Active' });
  });

  it('should clear all filters when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    const onFilterChange = vi.fn();
    render(
      <SearchFilter
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        sports={mockSports}
        statuses={mockStatuses}
      />
    );

    await user.type(screen.getByTestId('search-input'), 'John');
    await user.selectOptions(screen.getByTestId('sport-filter'), 'Swimming');
    await user.selectOptions(screen.getByTestId('status-filter'), 'Active');

    await user.click(screen.getByTestId('clear-button'));

    expect(screen.getByTestId('search-input')).toHaveValue('');
    expect(screen.getByTestId('sport-filter')).toHaveValue('');
    expect(screen.getByTestId('status-filter')).toHaveValue('');
    expect(onSearch).toHaveBeenLastCalledWith('');
    expect(onFilterChange).toHaveBeenLastCalledWith({ sport: '', status: '' });
  });

  it('should maintain combined filter state', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();
    render(<SearchFilter onFilterChange={onFilterChange} sports={mockSports} statuses={mockStatuses} />);

    await user.selectOptions(screen.getByTestId('sport-filter'), 'Swimming');
    await user.selectOptions(screen.getByTestId('status-filter'), 'Active');

    expect(onFilterChange).toHaveBeenLastCalledWith({ sport: 'Swimming', status: 'Active' });
  });
});
