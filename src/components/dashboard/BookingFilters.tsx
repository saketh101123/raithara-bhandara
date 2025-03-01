
import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface BookingFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateRangeFilter: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeFilterChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  onResetFilters: () => void;
}

const BookingFilters = ({
  statusFilter,
  onStatusFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange,
  onResetFilters
}: BookingFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dateRangeFilter.from ? (
                dateRangeFilter.to ? (
                  <>
                    {format(dateRangeFilter.from, "MMM d, yyyy")} -{" "}
                    {format(dateRangeFilter.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(dateRangeFilter.from, "MMM d, yyyy")
                )
              ) : (
                "Pick a date range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              selected={{
                from: dateRangeFilter.from,
                to: dateRangeFilter.to,
              }}
              onSelect={(range) => onDateRangeFilterChange(range || { from: undefined, to: undefined })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button variant="ghost" onClick={onResetFilters} className="shrink-0">
        Reset Filters
      </Button>
    </div>
  );
};

export default BookingFilters;
