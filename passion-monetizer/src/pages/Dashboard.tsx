import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', views: 120 },
  { name: 'Tue', views: 200 },
  { name: 'Wed', views: 150 },
  { name: 'Thu', views: 320 },
  { name: 'Fri', views: 280 },
  { name: 'Sat', views: 180 },
  { name: 'Sun', views: 240 },
]

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Creator Dashboard</h2>
        <p className="text-foreground/70">Weekly article views</p>
      </div>
      <div className="h-64 w-full rounded-md border p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
