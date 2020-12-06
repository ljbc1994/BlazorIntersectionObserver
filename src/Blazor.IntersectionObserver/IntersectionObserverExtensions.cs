using Microsoft.Extensions.DependencyInjection;

namespace Blazor.IntersectionObserver
{
    public static class IntersectionObserverExtensions
    {
        public static IServiceCollection AddIntersectionObserver(this IServiceCollection services)
        {
            return services.AddScoped<IIntersectionObserverService, IntersectionObserverService>();
        }
    }
}
