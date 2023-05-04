
namespace DBHelper
{   public class Setting
    {
        public int id { get; set; } = 0;
        public string?version { get; set; } = string.Empty;
        public string? key { get; set; } = string.Empty;
        public string? name { get; set; } = string.Empty;
        public string? value { get; set; } = string.Empty;
        public string? last_modified_at { get; set; } = DateTime.Now.ToString();
        public string? created_at { get; set; } = DateTime.Now.ToString();

    }
}
