export default function getPrevScene(currentScene: number) {
  return Math.max(currentScene - 1, 0);
}
