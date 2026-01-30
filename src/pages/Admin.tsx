import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ParticleStars } from '@/components/ParticleStars';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: string;
  full_name: string;
  gender: string;
  phone: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
  question_concern: string;
  preferred_plan: string;
  payment_screenshot_url: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const exportToCSV = () => {
    setExporting(true);
    try {
      if (bookings.length === 0) {
        toast.error('No bookings to export');
        return;
      }

      const headers = [
        'Name',
        'Gender',
        'Phone',
        'Date of Birth',
        'Time of Birth',
        'Place of Birth',
        'Question/Concern',
        'Plan',
        'Status',
        'Payment Screenshot',
        'Created At',
      ];

      const csvContent = [
        headers.join(','),
        ...bookings.map((booking) =>
          [
            `"${booking.full_name}"`,
            `"${booking.gender}"`,
            `"${booking.phone}"`,
            `"${booking.date_of_birth}"`,
            `"${booking.time_of_birth}"`,
            `"${booking.place_of_birth}"`,
            `"${booking.question_concern.replace(/"/g, '""')}"`,
            `"${booking.preferred_plan}"`,
            `"${booking.status}"`,
            `"${booking.payment_screenshot_url || ''}"`,
            `"${new Date(booking.created_at).toLocaleString()}"`,
          ].join(',')
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `cosmoracle-bookings-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Bookings exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export bookings');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleStars />
      <Header />

      <main className="pt-28 pb-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-6 md:p-8 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold holographic-text">
                  Booking Dashboard
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {bookings.length} total bookings
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={fetchBookings}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  onClick={exportToCSV}
                  disabled={exporting || bookings.length === 0}
                  className="btn-glow"
                >
                  {exporting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export CSV
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No bookings yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium">Name</th>
                      <th className="text-left py-3 px-2 font-medium">Phone</th>
                      <th className="text-left py-3 px-2 font-medium">Plan</th>
                      <th className="text-left py-3 px-2 font-medium">DOB</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Date</th>
                      <th className="text-left py-3 px-2 font-medium">Screenshot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-3 px-2">{booking.full_name}</td>
                        <td className="py-3 px-2">{booking.phone}</td>
                        <td className="py-3 px-2 text-xs">{booking.preferred_plan}</td>
                        <td className="py-3 px-2">{booking.date_of_birth}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            booking.status === 'pending' 
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : booking.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-xs">
                          {new Date(booking.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          {booking.payment_screenshot_url ? (
                            <a
                              href={booking.payment_screenshot_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-xs"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-xs">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
