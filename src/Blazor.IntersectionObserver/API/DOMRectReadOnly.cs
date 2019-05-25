namespace Blazor.IntersectionObserver.API
{
    public class DOMRectReadOnlyOptions
    {
        public double X { get; set; }

        public double Y { get; set; }

        public double Width { get; set; }

        public double Height { get; set; }
    }

    public class DOMRectReadOnly
    {
        public static DOMRectReadOnly FromRect(DOMRectReadOnlyOptions options)
        {
            return new DOMRectReadOnly(options);
        }

        public DOMRectReadOnly(double x, double y, double width, double height)
        {
            this.X = x;
            this.Y = y;
            this.Width = width;
            this.Height = height;
        }

        public DOMRectReadOnly(DOMRectReadOnlyOptions options)
        {
            this.X = options.X;
            this.Y = options.Y;
            this.Width = options.Width;
            this.Height = options.Height;
        }

        public DOMRectReadOnly() { }

        public double X { get; set; }
        public double Y { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Top { get; set; }
        public double Right { get; set; }
        public double Bottom { get; set; }
        public double Left { get; set; }
    }
}
