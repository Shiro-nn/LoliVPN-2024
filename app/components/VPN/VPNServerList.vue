<template>
  <div class="server-section">
    <div class="section-header">
      <h3 class="section-title">Servers</h3>
      <div class="view-toggle">
        <button
            v-for="view in views"
            :key="view"
            class="view-btn"
            :class="{ active: activeView === view }"
            @click="$emit('change-view', view)"
        >
          {{ view }}
        </button>
      </div>
    </div>
    <input
        v-model="searchTerm"
        type="text"
        class="server-search"
        placeholder="Search servers..."
    >
    <div class="server-list">
      <div v-for="group in groupedServers" :key="group.title" class="server-group">
        <div class="server-group-title">{{ group.title }}</div>
        <VPNServerItem
            v-for="server in group.servers"
            :key="server.id"
            :server="server"
            :active="server.id === selectedServer"
            @select="$emit('select-server', server.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Server {
  id: string
  name: string
  flag: string
  ping: string
  load: 'low' | 'medium' | 'high'
  premium: boolean
  region: string
}

interface Props {
  servers: Record<string, Server>
  selectedServer?: string | null
  activeView?: string
}

const props = defineProps<Props>()
defineEmits<{
  'select-server': [serverId: string]
  'change-view': [view: string]
}>()

const views = ['List', 'Map']
const searchTerm = ref('')

const filteredServers = computed(() => {
  const servers = Object.entries(props.servers).filter(([id]) => id !== 'auto')
  if (!searchTerm.value) return servers
  return servers.filter(([id, server]) =>
      server.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const groupedServers = computed(() => {
  const groups = [
    { title: 'Recommended', servers: [] as Array<{id: string} & Server> },
    { title: 'Recent', servers: [] as Array<{id: string} & Server> },
    { title: 'Americas', servers: [] as Array<{id: string} & Server> },
    { title: 'Europe', servers: [] as Array<{id: string} & Server> },
    { title: 'Asia Pacific', servers: [] as Array<{id: string} & Server> }
  ]

  filteredServers.value.forEach(([id, server]) => {
    const serverWithId = { id, ...server }
    switch (server.region) {
      case 'americas':
        groups[2].servers.push(serverWithId)
        break
      case 'europe':
        groups[3].servers.push(serverWithId)
        break
      case 'asia':
        groups[4].servers.push(serverWithId)
        break
    }
    if (parseInt(server.ping) < 50) {
      groups[0].servers.push(serverWithId)
    }
  })

  return groups.filter(group => group.servers.length > 0)
})
</script>

<style scoped>
.server-section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.view-toggle {
  display: flex;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.view-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 6px 10px;
  cursor: pointer;
  transition: var(--transition-fast);
  font-size: 12px;
}

.view-btn.active {
  background: var(--primary-blue);
  color: white;
}

.server-search {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 12px 16px;
  color: var(--text-primary);
  width: 100%;
  margin-bottom: 16px;
  font-size: 14px;
  transition: var(--transition-normal);
}

.server-search:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
}

.server-search::placeholder {
  color: var(--text-muted);
}

.server-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.server-list::-webkit-scrollbar {
  width: 4px;
}

.server-list::-webkit-scrollbar-track {
  background: var(--glass-bg);
  border-radius: 2px;
}

.server-list::-webkit-scrollbar-thumb {
  background: var(--primary-blue);
  border-radius: 2px;
}

.server-group {
  margin-bottom: 16px;
}

.server-group-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding-left: 4px;
}
</style>