import { writable } from 'svelte/store';

export class Grid {
  private _step = 1;
  private _playing = false;
  private _shouldPause = false;
  private lastUpdate = 0;
  private currentIndex = 0;

  public cells = writable<boolean[]>([]);
  public delay = 200;
  public step = writable<number>(this._step);
  public playing = writable(this._playing);
  public shouldPause = writable(this._shouldPause);

  constructor(public size: number) {
    this.cells.set([...new Array(size)].map((_) => false));
    requestAnimationFrame(this.animationLoop.bind(this));

    this.playing.subscribe((e) => (this._playing = e));
    this.shouldPause.subscribe((e) => (this._shouldPause = e));
    this.step.subscribe((e) => {
      this._step = e;
      this.currentIndex = e - 1;
    });
  }

  clear() {
    this.cells.update((c) => c.map((_) => false));
    this.step.set(1);
  }

  play() {
    if (this._step > this.size) return;
    this.playing.set(true);
  }

  pause() {
    this.shouldPause.set(true);
  }

  apply() {
    this.cells.update((cells) => {
      return cells.map((c, i) => ((i + 1) % this._step === 0 ? !c : c));
    });
  }

  private performStep() {
    this.cells.update((c) => {
      c[this.currentIndex] = !c[this.currentIndex];
      return c;
    });
    this.currentIndex += this._step;

    if (this.currentIndex >= this.size) {
      const next = this._step + 1;
      if (next <= this.size) {
        this.step.set(next);
        if (this._shouldPause) {
          this.playing.set(false);
          this.shouldPause.set(false);
        }
      } else {
        this.playing.set(false);
        this.shouldPause.set(false);
      }
    }
  }

  private animationLoop(timestamp: number) {
    if (this._playing) {
      const diff = timestamp - this.lastUpdate;

      if (diff >= this.delay) {
        this.lastUpdate = timestamp;
        this.performStep();
      }
    }
    requestAnimationFrame(this.animationLoop.bind(this));
  }
}
