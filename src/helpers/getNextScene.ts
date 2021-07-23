export default function getNextScene(currentScene: number, totalScenes: number) {
  return Math.min(currentScene + 1, totalScenes);
}
