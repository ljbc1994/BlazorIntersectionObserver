using Microsoft.JSInterop;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Blazor.IntersectionObserver.Test.Wrappers
{
    public interface IJSRuntimeWrapper: IJSRuntime
    {
        new ValueTask<TValue> InvokeAsync<TValue>(string identifier, params object[] args);

        new ValueTask<TValue> InvokeAsync<TValue>(string identifier, CancellationToken cancellationToken, params object[] args);

        ValueTask<TValue> InvokeAsync<TValue>(string identifier, TimeSpan timeout, params object[] args);
    }

    public class JSRuntimeWrapper : IJSRuntimeWrapper
    {
        public ValueTask<TValue> InvokeAsync<TValue>(string identifier, params object[] args)
        {
            return new ValueTask<TValue>();
        }

        public ValueTask<TValue> InvokeAsync<TValue>(string identifier, CancellationToken cancellationToken, params object[] args)
        {
            return new ValueTask<TValue>();
        }

        public ValueTask<TValue> InvokeAsync<TValue>(string identifier, TimeSpan timeout, params object[] args)
        {
            return new ValueTask<TValue>();
        }
    }
}
