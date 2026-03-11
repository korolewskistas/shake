export interface Waypoint {
  X: number;
  Y: number;
  Z: number;
  iterations: number;
}

export interface Bot {
  id: number;
  townId: number;
  waypoints: Waypoint[];
}

export const bots: Bot[] = [
  {
    id: 1,
    townId: 1,
    waypoints: [
      { X: 82248, Y: 148600, Z: -3464, iterations: 20 },
      { X: 82072, Y: 147560, Z: -3464, iterations: 20 },
      { X: 82792, Y: 147832, Z: -3464, iterations: 20 },
      { X: 83320, Y: 147976, Z: -3400, iterations: 20 },
      { X: 84584, Y: 148536, Z: -3400, iterations: 20 },
      { X: 83384, Y: 149256, Z: -3400, iterations: 20 },
      { X: 83064, Y: 148392, Z: -3464, iterations: 20 },
      { X: 87016, Y: 148632, Z: -3400, iterations: 20 },
      { X: 85816, Y: 148872, Z: -3400, iterations: 20 },
      { X: 85832, Y: 153208, Z: -3496, iterations: 20 },
      { X: 81384, Y: 150040, Z: -3528, iterations: 20 },
      { X: 79656, Y: 150728, Z: -3512, iterations: 20 },
      { X: 79272, Y: 149544, Z: -3528, iterations: 20 },
      { X: 80744, Y: 146424, Z: -3528, iterations: 20 },
    ]
  }
];

export function normalizeCoordinates(waypoints: Waypoint[]): { x: number; y: number }[] {
  const xs = waypoints.map(w => w.X);
  const ys = waypoints.map(w => w.Y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  
  return waypoints.map(w => ({
    x: ((w.X - minX) / rangeX) * 100,
    y: ((w.Y - minY) / rangeY) * 100
  }));
}
