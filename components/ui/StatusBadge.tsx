type Props = {
  active: boolean;
};

export function StatusBadge({ active }: Props) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs ${
        active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
      }`}
    >
      {active ? 'Activa' : 'Inactiva'}
    </span>
  );
}
