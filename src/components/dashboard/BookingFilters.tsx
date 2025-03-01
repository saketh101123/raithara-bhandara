
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface BookingFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateRangeFilter: DateRange;
  onDateRangeFilterChange: (range: DateRange) => void;
  onResetFilters: () => void;
}

const BookingFilters = ({
  statusFilter,
  onStatusFilterChange,
  dateRangeFilter,
  onDateRangeFilterChange,
  onResetFilters,
}: BookingFiltersProps) => {
  const hasActiveFilters = statusFilter !== 'all' || dateRangeFilter.from !== undefined;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-muted/50 p-4 rounded-lg">
      <div className="flex-1">
        <div className="text-sm font-medium mb-2">Status</div>
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
        <div className="text-sm font-medium mb-2">Booking Date</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRangeFilter.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRangeFilter.from ? (
                dateRangeFilter.to ? (
                  <>
                    {format(dateRangeFilter.from, "LLL dd, y")} -{" "}
                    {format(dateRangeFilter.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRangeFilter.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRangeFilter.from}
              selected={{
                from: dateRangeFilter.from,
                to: dateRangeFilter.to,
              }}
              onSelect={(range) => {
                // Ensure range.to is defined when passing to the filter function
                if (range?.from) {
                  onDateRangeFilterChange({
                    from: range.from,
                    to: range.to || range.from
                  });
                } else {
                  onDateRangeFilterChange({ from: undefined, to: undefined });
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-end">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-muted-foreground hover:text-foreground"
            onClick={onResetFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingFilters;
