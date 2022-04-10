<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import studentDashboard from './student'
import teacherDashboard from './teacher'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, studentDashboard, teacherDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    console.log('-------------->roles', this.roles)
    if (this.roles.includes('admin')) {
      console.log('admin')
      this.currentRole = 'adminDashboard'
    }
    if (this.roles.includes('student')) {
      console.log('student')
      this.currentRole = 'studentDashboard'
    }
    if (this.roles.includes('teacher')) {
      console.log('teacher')
      this.currentRole = 'teacherDashboard'
    }
  }
}
</script>
