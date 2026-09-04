interface Column<T> { key: string; label: string; render: (row: T) => React.ReactNode }

export function DataTable<T extends { id: number }>({ columns, rows, empty = 'No records found.' }: { columns: Column<T>[]; rows: T[]; empty?: string }) {
  return <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row) => <tr key={row.id}>{columns.map((column) => <td key={column.key}>{column.render(row)}</td>)}</tr>) : <tr><td className="empty-cell" colSpan={columns.length}>{empty}</td></tr>}</tbody></table></div>
}
