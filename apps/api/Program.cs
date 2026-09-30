using Npgsql;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("SmartOps")
    ?? throw new InvalidOperationException("Connection string 'SmartOps' is not configured.");
var allowedOrigin = builder.Configuration["Frontend:AllowedOrigin"] ?? "http://localhost:3000";

builder.Services.AddSingleton(NpgsqlDataSource.Create(connectionString));
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.WithOrigins(allowedOrigin)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("frontend");

app.MapGet("/health", async Task<IResult> (NpgsqlDataSource dataSource, CancellationToken cancellationToken) =>
{
    try
    {
        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var command = connection.CreateCommand();
        command.CommandText = "SELECT 1";
        await command.ExecuteScalarAsync(cancellationToken);

        return Results.Ok(new { status = "healthy", database = "connected" });
    }
    catch (NpgsqlException)
    {
        return Results.Json(
            new { status = "unhealthy", database = "unavailable" },
            statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.Run();
